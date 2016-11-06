var Category = require("./models/category");
var metadata = require("./utils/metadata");
var express = require("express");
var app = express();

// for test purposes
app.get("/test", function(req, res) {
  var json = {
    categories: [
      {
        name: "software",
        description: "Categoría relacionada con software"
      },
      {
        name: "music",
        description: "Categoría relacionada con la música"
      }
    ],
    metadata: {
      version: "0.1",
      count: 2
    }
  };
  res.send(json);
});

// Listado de categorias
app.get("/", function(req, res, next) {
  Category.findAll()
    .then(function(categories) {
      console.log(categories);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(metadata({categories: categories}));
    })
    .catch(function(err) {
      next(err);
    });
});

var validateCategory = function(req, res, next) {
  console.log('validando la categoria');
  Category.findOne({where: {name: req.params.name}})
    .then(function(cat) {
      if (cat === null) {
        var msg = 'No se encuentra la categoria [' + req.params.name + ']';
        console.log(msg);
        res.status(404).json({code: 404, message: msg});
      } else {
        console.log('Categoria encontrada [' + cat + ']');
        next();
      }
    })
    .catch(function(err) {
      next(err);
    });
};

var bodyMissing = function(body, field) {
  return body[field] === undefined ? field : "";
};

var validateBody = function(req, res, next) {
  var body = req.body;
  console.log("Validation before saving Category, body=" +
    JSON.stringify(body));
  if (body === undefined) {
    res.status(400).json({code: 400, message: 'Falta body'});
  } else if (body.name === undefined || body.description === undefined) {
    res.status(400).json({code: 400, message: "Falta atributo en body: " +
      bodyMissing(body, "name") + ' ' + bodyMissing(body, "description")});
  } else {
    next();
  }
};

// Alta de categorias
app.post("/", validateBody, function(req, res, next) {
  var body = req.body;
  var category2Save = {
    name: body.name,
    description: body.description
  };

  Category.create(category2Save)
    .then(function(category) {
      console.log(category);
      res.status(201).json([category2Save]);
    })
    .catch(function(err) {
      next(err);
    });
});

// Modificación de categorias
app.put("/:name", validateCategory, validateBody, function(req, res, next) {
  var body = req.body;
  var category2Update = {
    name: body.name,
    description: body.description
  };

  Category.update(category2Update, {where: {name: req.params.name}})
    .then(function(category) {
      console.log(category);
      res.status(200).json([category2Update]);
    })
    .catch(function(err) {
      next(err);
    });
});

// Baja de categorias
app.delete("/:name", validateCategory, function(req, res, next) {
  Category.destroy({where: {name: req.params.name}})
    .then(function(category) {
      res.status(204).end();
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = app;
