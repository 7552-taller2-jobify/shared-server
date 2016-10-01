var Skill = require("./models/skill");
var Category = require("./models/category");
var metadata = require("./utils/metadata");
var express = require("express");
var app = express();

//for test purposes
app.get("/test", function(req, res) {
  var json = {
    "skills": [
      {
        "name": "c",
        "category": "software",
        "description": "Lenguaje de programación C"
      },
      {
        "name": "Java",
        "category": "software",
        "description": "Lenguaje de programación Java"
      }
    ],
    "metadata": {
      "version": "0.1",
      "count": 2
    }
  };
  res.send(json);
});

//Listado de habilidades
app.get("/", function(req, res) {
  Skill.findAll()
    .then(function(skills) {
      console.log(skills);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(metadata({skills: skills}));
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

//Alta de habilidades
app.post("/:category", validateCategory, function(req, res, next) {
  var body = req.body;
  console.log("Validation before saving Skill, body="+JSON.stringify(body));
  if (body === undefined) {
    res.status(400).json({code:400, message:'Falta body'});
  } else if (body.name === undefined || body.description === undefined) { 
    res.status(400).json({code:400, message:"Falta atributo en body: "+(!body.name?"name":(!body.description?"description":""))});
  } else {
    next();
  }
}, function(req, res) {
  var body = req.body;
  var skill2Save = {
    name: body.name,
    category_name: req.params.category,
    description: body.description
  };

  Skill.create(skill2Save)
    .then(function(skill){
      console.log(skill)
      res.status(201).json([skill2Save]);
    });
});

//Modificación de habilidades
app.put("/:category/:name", validateCategory, function(req, res, next) {
  var body = req.body;
  console.log("Validation before updating Skill, body="+JSON.stringify(body));
  if (body === undefined) {
    res.status(400).json({code:400, message:'Falta body'});
  } else if (body.name === undefined || body.category === undefined || body.description === undefined) { 
    res.status(400).json({code:400, message:"Falta atributo en body: "+(!body.name?"name":(!body.category?"category":(!body.description?"description":"")))});
  } else {
    next();
  }
}, function(req, res) {
  var body = req.body;
  var skill2Update = {
    name: body.name,
    category_name: body.category,
    description: body.description
  };

  Skill.update(skill2Update, { where: {category_name: req.params.category, name: body.name} })
    .then(function(skill){
      console.log(skill)
      res.status(200).json([skill2Update]);
    });
});

//Baja de habilidades
app.delete("/:category/:name", validateCategory, function(req, res) {
  Skill.destroy({ where: {category_name: req.params.category, name: req.params.name } })
    .then(function(skill){
      res.status(204).end();
    });
});

module.exports = app;
