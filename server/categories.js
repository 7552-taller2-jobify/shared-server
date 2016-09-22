var Category = require("./models/category");
var metadata = require("./utils/metadata");
var express = require("express");
var app = express();

//for test purposes
app.get("/test", function(req, res) {
  var json = {
  "categories": [
    {
      "name": "software",
      "description": "Categoría relacionada con software"
    },
    {
      "name": "music",
      "description": "Categoría relacionada con la música"
    }
  ],
  "metadata": {
    "version": "0.1",
    "count": 2
  }
};
  res.send(json);
});

//Listado de categorias
app.get("/", function(req, res) {
  Category.findAll()
    .then(function(categories) {
      console.log(categories);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(metadata({categories: categories}));
    });
});

var validateCategory = function(req, res, next) {
  console.log('validando la categoria');
  Category.findOne({ where: {name: req.params.name} }).then(function(cat){
    if (cat == null) {
      var msg = 'No se encuentra la categoria ['+req.params.name+']';
      console.log(msg);
      res.status(404).json({code:404, message:msg});
    } else {
      console.log('Categoria encontrada ['+cat+']');
      next();
    }
  });
}

var validateBody = function(req, res, next) {
  var body = req.body;
  console.log("Validation before saving Category, body="+JSON.stringify(body));
  if (body === undefined) {
    res.status(400).json({code:400, message:'Falta body'});
  } else if (body.name === undefined || body.description === undefined) { 
    res.status(400).json({code:400, message:"Falta atributo en body: "+(!body.name?"name":(!body.description?"description":""))});
  } else {
    next();
  }
};

//Alta de categorias
app.post("/", validateBody, function(req, res) {
  var body = req.body;
  var category2Save = {
    name: body.name,
    description: body.description
  };

  Category.create(category2Save)
    .then(function(category){
      console.log(category)
      res.status(201).json([category2Save]);
    });
});

//Modificación de categorias
app.put("/:name", validateCategory, validateBody, function(req, res) {
  var body = req.body;
  var category2Update = {
    name: body.name,
    description: body.description
  };

  Category.update(category2Update, { where: {name: body.name} })
    .then(function(category){
      console.log(category)
      res.status(200).json([category2Update]);
    });
});

//Baja de categorias
app.delete("/:name", validateCategory, function(req, res) {
  Category.destroy({ where: {name: req.params.name } })
    .then(function(category){
      res.status(204).end();
    });
});

module.exports = app;
