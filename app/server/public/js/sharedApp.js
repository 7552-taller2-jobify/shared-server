
var host = 'http://localhost:5000';
var app = angular.module('sharedApp',['ngMaterial','ngRoute'])
		  .config(function($mdIconProvider){ 
			  $mdIconProvider.icon('menu','./images/menu.svg',24);
			   });


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
    .when("/puestos", {templateUrl: "partials/puestos.html", controller: "PuestosCtrl"})
    .when("/habilidades", {templateUrl: "partials/habilidades.html", controller: "HabilidadesCtrl"})
    .when("/categorias", {templateUrl: "partials/categorias.html", controller: "CategoriasCtrl"})
    // about
    .when("/about", {templateUrl: "partials/about.html", controller: "AboutCtrl"})
}]);

app.controller('sharedAppController', function ($mdSidenav) {
   var self = this;

  self.selected     = null;
  self.toggleMenu   = toggleMenu;

  function toggleMenu() {
  	$mdSidenav('left').toggle();
  	console.log("toogle");
  }
});

app.controller('HomeCtrl', function (/* $scope, $location, $http */) {
  console.log("Home controller.");
});
app.controller('PuestosCtrl', function ($scope,$http) {
  console.log("Puestos controller.");
  	$scope.categoria;
    $scope.puestos = [];


    $scope.borrarPuesto = function(idx){    	
    	var puestoABorrar = $scope.puestos[idx];
	 	console.log(puestoABorrar.name);
	 	$http({ method : 'DELETE', url : host + '/job_positions/categories/'
	 		+ puestoABorrar.category +'/'+ puestoABorrar.name  });
    	$scope.getPuestos();
		
    };
    $scope.crearPuesto = function(){
    	$http({ method : 'POST', url : host + '/job_positions/categories/' + $scope.categoria, 
    			data : { "name": $scope.name , "description": $scope.description } })
    	.success(function(data){
    		$scope.getPuestos();
    	});
    	
    };
    $scope.getPuestos = function() {

        $http({	method : 'GET',url : host + '/job_positions', 
        		headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.puestos = data.job_positions;
                console.log(data);
            })
            .error(function(data, status) {
                alert("Error al obtener los puestos");
            });
    };
        $scope.getCategorias = function() {

        $http({	method : 'GET',url : host + '/categories', 
        		headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.categorias = data.categories;
                console.log(data);
            })
            .error(function(data, status) {
                alert("Error al obtener las categorias");
            });
    };
});
app.controller('HabilidadesCtrl', function ($scope,$http) {
  	console.log("habilidades controller.");
  	$scope.categoria;
    $scope.habilidades = [];
    $scope.borrarHabilidad = function(idx){    	
    	var habilidadABorrar = $scope.habilidades[idx];
	 	console.log(habilidadABorrar.name);
	 	$http({ method : 'DELETE', url : host + '/skills/categories/'
	 		+ habilidadABorrar.category +'/'+ habilidadABorrar.name  });
    	$scope.getHabilidades();
		
    };
    $scope.crearHabilidad = function(){
    	$http({ method : 'POST', url : host + '/skills/categories/' + $scope.categoria, 
    			data : { "name": $scope.name , "description": $scope.description } })
    	.success(function(data){
    		$scope.getHabilidades();
    	});
    	
    };
    $scope.getHabilidades = function() {

        $http({	method : 'GET',url : host + '/skills', 
        		headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.habilidades = data.skills;
                console.log(data);
            })
            .error(function(data, status) {
                alert("Error al obtener las habilidades");
            });
    };
        $scope.getCategorias = function() {

        $http({	method : 'GET',url : host + '/categories', 
        		headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.categorias = data.categories;
                console.log(data);
            })
            .error(function(data, status) {
                alert("Error al obtener las categorias");
            });
    };
});
app.controller('CategoriasCtrl', function ($scope,$http) {
  console.log("Categorias controller 1.");
    $scope.categorias = [];
    $scope.borrarCategoria = function(idx){    	
    	var categoriaABorrar = $scope.categorias[idx];
	 	console.log(categoriaABorrar.name);
	 	$http({ method : 'DELETE', url : host + '/categories/' 
	 		+ categoriaABorrar.name  });
    	$scope.getCategorias();
		
    };
    $scope.crearCategoria = function(){
    	$http({ method : 'POST', url : host + '/categories', 
    			data : { "name": $scope.name , "description": $scope.description } });
    	$scope.getCategorias();
    };
    $scope.getCategorias = function() {

        $http({	method : 'GET',url : host + '/categories', 
        		headers: { 'X-Parse-Application-Id':'XXX', 'X-Parse-REST-API-Key':'YYY'}})
            .success(function(data, status) {
                $scope.categorias = data.categories;
                console.log(data);
            })
            .error(function(data, status) {
                alert("Error al obtener las categorias");
            });
    };
});

app.controller('AboutCtrl', function (/* $scope, $location, $http */) {
  console.log("About controller.");
});