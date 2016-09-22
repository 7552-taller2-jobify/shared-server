var Position = require("./models/position");
var Category = require("./models/category");
var metadata = require("./utils/metadata");
var express = require("express");
var app = express();

//for test purposes
app.get("/test", function(req, res) {
  var json = {
    "job_positions": [
      {
        "name": "developer",
        "category": "software",
        "description": "Desarrollador"
      },
      {
        "name": "project manager",
        "category": "software",
        "description": "Persona encargada de manejar el proyecto"
      },
      {
        "name": "dj",
        "category": "music",
        "description": "Persona que selecciona y mezcla música"
      }
    ],
    "metadata": {
      "version": 0.1,
      "count": 3
    }
  };
  res.send(json);
});

//Listado de puestos
app.get("/", function(req, res) {
  Position.findAll()
    .then(function(positions) {
      console.log(positions);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(metadata({job_positions: positions}));
    });
});

var validateCategory = function(req, res, next) {
  console.log('validando la categoria');
  Category.findOne({ where: {name: req.params.category} }).then(function(cat){
    if (cat == null) {
      var msg = 'No se encuentra la categoria ['+req.params.category+']';
      console.log(msg);
      res.status(404).json({code:404, message:msg});
    } else {
      console.log('Categoria encontrada ['+cat+']');
      next();
    }
  });
  console.log('nos pasamos?');
}

//Listado de puestos por categoria
app.get("/:category", validateCategory, function(req, res) {
  Position.findAll({ where: { category_name: req.params.category }})
    .then(function(positions) {
      console.log(positions);
      res.status(200).json(metadata({job_positions: positions}));
    });
});

//Alta de puestos
app.post("/:category", validateCategory, function(req, res, next) {
  var body = req.body;
  console.log("Validation before saving Position, body="+JSON.stringify(body));
  if (body === undefined) {
    res.status(400).json({code:400, message:'Falta body'});
  } else if (body.name === undefined || body.description === undefined) { 
    res.status(400).json({code:400, message:"Falta atributo en body: "+(!body.name?"name":(!body.description?"description":""))});
  } else {
    next();
  }
}, function(req, res) {
  var body = req.body;
  var position2Save = {
    name: body.name,
    category_name: req.params.category,
    description: body.description
  };

  Position.create(position2Save)
    .then(function(pos){
      console.log(pos)
      res.status(201).json([position2Save]);
    });
});

//Modificación de puestos
app.put("/:category/:name", validateCategory, function(req, res, next) {
  var body = req.body;
  console.log("Validation before updating Position, body="+JSON.stringify(body));
  if (body === undefined) {
    res.status(400).json({code:400, message:'Falta body'});
  } else if (body.name === undefined || body.category === undefined || body.description === undefined) { 
    res.status(400).json({code:400, message:"Falta atributo en body: "+(!body.name?"name":(!body.category?"category":(!body.description?"description":"")))});
  } else {
    next();
  }
}, function(req, res) {
  var body = req.body;
  var position2Update = {
    name: body.name,
    category_name: body.category,
    description: body.description
  };

  Position.update(position2Update, { where: {category_name: req.params.category, name: body.name} })
    .then(function(pos){
      console.log(pos)
      res.status(200).json([position2Update]);
    });
});

//Baja de puestos
app.delete("/:category/:name", validateCategory, function(req, res) {
  Position.destroy({ where: {category_name: req.params.category, name: req.params.name } })
    .then(function(pos){
      res.status(204).end();
    });
});

module.exports = app;
