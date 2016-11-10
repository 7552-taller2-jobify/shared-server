
var host = 'http://jobify-7552-taller2.herokuapp.com:5000';
var app = angular.module('sharedApp', ['ngMaterial', 'ngRoute']).config(function($mdIconProvider){ 
  $mdIconProvider.icon('menu', './images/menu.svg', 24);});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
    .when("/puestos", {templateUrl: "partials/puestos.html", controller: "PuestosCtrl"})
    .when("/puestos/categorias/:categoria/:name/edit", 
        {templateUrl: "partials/editPuestos.html", controller: "PuestosCtrl"})
    .when("/habilidades", {templateUrl: "partials/habilidades.html", controller:"HabilidadesCtrl"})
    .when("/habilidades/categorias/:categoria/:name/edit", 
        {templateUrl: "partials/editHabilidades.html", controller: "HabilidadesCtrl"})
    .when("/categorias", {templateUrl: "partials/categorias.html", controller: "CategoriasCtrl"})
    .when("/categorias/:name/edit", {templateUrl: "partials/editCategorias.html", controller: "CategoriasCtrl"})
    // about
    .when("/about", {templateUrl: "partials/about.html", controller: "AboutCtrl"})
}]);

function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };

app.controller('sharedAppController', function ($mdSidenav) {
   var self = this;

  self.selected = null;
  self.toggleMenu = toggleMenu;

  function toggleMenu() {
    $mdSidenav('left').toggle();
    console.log("toogle");
  }
});

app.controller('HomeCtrl', function (/* $scope, $location, $http */) {
  console.log("Home controller.");
});
app.controller('PuestosCtrl', function ($scope,$http, $mdDialog,$routeParams,$location) {
  console.log("Puestos controller.");
    $scope.nameInit = $routeParams.name;
    $scope.nameEdit = $routeParams.name;
    $scope.descriptionEdit = $routeParams.description;
    $scope.categoryInit = $routeParams.categoria;
    $scope.categoryEdit = $routeParams.categoria;
    $scope.categoria;
    $scope.puestos = [];
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.dataError;

  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error ' + $scope.dataError.code)
        .textContent($scope.dataError.message)
        .ariaLabel('Error')
        .ok('Aceptar')
        .targetEvent(ev)
    );
  };
      $scope.editarPuesto = function(idx){      
        $http({ method : 'PUT', url : host + '/job_positions/categories/'+$scope.categoryInit+'/'+ $scope.nameInit ,
        data : { "name": $scope.nameEdit , "description": $scope.descriptionEdit ,"category" :$scope.categoryEdit}})
        .success( function(data,status){
            $scope.getPuestos();
            $location.$$search = {};
            $location.path('/puestos');
            
        })
        .error(function(data,status){
            $scope.dataError = data;
            $scope.showAlert();
        });
    };
    $scope.borrarPuesto = function(idx){        
        var puestoABorrar = $scope.puestos[idx];
        console.log(puestoABorrar.name);
        $http({ method : 'DELETE', 
                url : host + '/job_positions/categories/' + puestoABorrar.category +'/'+ 
                puestoABorrar.name  }).
        success(function(data,status){
            $scope.getPuestos();
        })
        .error(function(data,status){
            $scope.dataError = data;
            $scope.showAlert();
        });
    };
    $scope.crearPuesto = function(){
        $http({ method : 'POST', 
                url : host + '/job_positions/categories/' + $scope.categoria, 
                data : { "name": $scope.name , "description": $scope.description }})
        .success(function(data){
            $scope.name = undefined;
            $scope.description = undefined;
            $scope.categoria = undefined;
            $scope.getPuestos();
        })
        .error(function (data, status){
            $scope.dataError = data;
            $scope.showAlert();
        });
    };
    $scope.getPuestos = function() {
        $http({ method : 'GET',
                url : host + '/job_positions', 
                headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.puestos = data.job_positions;
                console.log(data);
            })
            .error(function(data, status) {
                $scope.dataError = data;
                $scope.showAlert();
            });
    };
        $scope.getCategorias = function() {
        $http({ method : 'GET',
                url : host + '/categories', 
                headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.categorias = data.categories;
                console.log(data);
            })
            .error(function(data, status) {
                $scope.dataError = data;
                $scope.showAlert();
            });
    };
});
app.controller('HabilidadesCtrl', function ($scope,$http, $mdDialog,$routeParams,$location) {
    console.log("habilidades controller.");
    $scope.nameInit = $routeParams.name;
    $scope.nameEdit = $routeParams.name;
    $scope.descriptionEdit = $routeParams.description;
    $scope.categoryInit = $routeParams.categoria;
    $scope.categoryEdit = $routeParams.categoria;
    $scope.categoria;
    $scope.habilidades = [];
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.dataError;

  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error ' + $scope.dataError.code)
        .textContent($scope.dataError.message)
        .ariaLabel('Error')
        .ok('Aceptar')
        .targetEvent(ev)
    );
  };
    $scope.borrarHabilidad = function(idx){     
        var habilidadABorrar = $scope.habilidades[idx];
        console.log(habilidadABorrar.name);
        $http({ method : 'DELETE', 
                url : host + '/skills/categories/' + habilidadABorrar.category +'/'+ 
                habilidadABorrar.name }).
        success(function(data,status){
            $scope.getHabilidades();
        })
        .error(function(data,status){
            $scope.dataError = data;
            $scope.showAlert();
        });
        
    };
    $scope.editarHabilidad = function(idx){     
        $http({ method : 'PUT', url : host + '/skills/categories/'+$scope.categoryInit+'/'+ $scope.nameInit ,
        data : { "name": $scope.nameEdit , "description": $scope.descriptionEdit ,"category" :$scope.categoryEdit}})
        .success( function(data,status){
            $scope.getHabilidades();
            $location.$$search = {};
            $location.path('/habilidades');
            
        })
        .error(function(data,status){
            $scope.dataError = data;
            $scope.showAlert();
        });
    };
    $scope.crearHabilidad = function(){
            $http({ method : 'POST', 
                url : host + '/skills/categories/' + $scope.categoria, 
                data : { "name": $scope.name , "description": $scope.description }})
            .success(function(data){
                $scope.name = undefined;
                $scope.description = undefined;
                $scope.categoria = undefined;
                $scope.getHabilidades();
            })
            .error(function(data,status){
                $scope.dataError = data;
                $scope.showAlert();
            });
    };
    $scope.getHabilidades = function() {
        $http({ method : 'GET',
                url : host + '/skills', 
                headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.habilidades = data.skills;
                console.log(data);
            })
            .error(function(data, status) {
                $scope.dataError = data;
                $scope.showAlert();
            });
    };
        $scope.getCategorias = function() {
        $http({ method : 'GET',
                url : host + '/categories', 
                headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.categorias = data.categories;
                console.log(data);
            })
            .error(function(data, status) {
                $scope.dataError = data;
                $scope.showAlert();
            });
    };
});
app.controller('CategoriasCtrl', function ($scope,$http, $mdDialog,$routeParams,$location) {
  console.log($routeParams);
    $scope.nameInit = $routeParams.name;
    $scope.nameEdit = $routeParams.name;
    $scope.descriptionEdit = $routeParams.description;
    $scope.categorias = [];
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.dataError;

  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error ' + $scope.dataError.code)
        .textContent($scope.dataError.message)
        .ariaLabel('Error')
        .ok('Aceptar')
        .targetEvent(ev)
    );
  };
      $scope.editarCategoria = function(idx){       
        $http({ method : 'PUT', url : host + '/categories/' + $scope.nameInit ,
        data : { "name": $scope.nameEdit , "description": $scope.descriptionEdit }})
        .success( function(data,status){
            $scope.getCategorias();
            $location.path('/categorias');
            
        })
        .error(function(data,status){
            $scope.dataError = data;
            $scope.showAlert();
        });
    };
    $scope.borrarCategoria = function(idx){     
        var categoriaABorrar = $scope.categorias[idx];
        console.log(categoriaABorrar.name);
        $http({ method : 'DELETE', url : host + '/categories/' + categoriaABorrar.name })
        .success( function(data,status){
            $scope.getCategorias();
        })
        .error(function(data,status){
            $scope.dataError = data;
            $scope.showAlert();
        });
    };
    $scope.crearCategoria = function(){
            $http({ 
            method : 'POST', 
            url : host + '/categories', 
            data : { "name": $scope.name , "description": $scope.description } })
            .success(function(data,status){
                $scope.name = undefined;
                $scope.description = undefined;
                $scope.getCategorias();
            })
            .error(function(data,status){
                $scope.dataError = data;
                $scope.showAlert();
                console.log(data);
            });

    };

    $scope.getCategorias = function() {
        $http({ method : 'GET',
                url : host + '/categories', 
                headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.categorias = data.categories;
                console.log(data);
            })
            .error(function(data, status) {
                $scope.dataError = data;
                $scope.showAlert();
            });
    };
});
app.controller('AboutCtrl', function (/* $scope, $location, $http */) {
    console.log("About controller.");
});
