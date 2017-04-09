var app = angular.module('cupcakeApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/list', {
			controller: 'listCtrl',
			templateUrl: 'partials/list.html'
		}).when('/form', {
			controller: 'formCtrl',
			templateUrl: 'partials/form.html'
		}).when('/details/:cupcakeIdx', {
			controller: 'detailsCtrl',
			templateUrl: 'partials/details.html'
		}).otherwise({ redirectTo: '/list' });
});

app.controller('listCtrl', function($scope, cupcakeSrv){
	$scope.cupcakes = {};
	$scope.cupcakesArray = cupcakeSrv.getCupcakes();
	$scope.removeCupcake = function(pIndex) {
		cupcakeSrv.removeCupcake(pIndex);
	}
});

app.controller('formCtrl', function($scope,cupcakeSrv){
	$scope.addCupcake = function() {
		cupcakeSrv.addCupcake($scope.cupcakes);
		$scope.cupcakes = '';
		document.location.hash = '#/list';
	}
});

app.controller('detailsCtrl', function($scope, cupcakeSrv, $routeParams){
	$scope.cupcakes = cupcakeSrv.getCupcakesAt($routeParams.cupcakeIdx);
});

app.service('cupcakeSrv', function(){
	var cupcakesArray = [];

	this.getCupcakesAt = function(idx) {
		return this.getCupcakes()[idx];
	}

	this.getCupcakes = function() {
		var str = localStorage.getItem('CupcakesLS');
		cupcakesArray = JSON.parse(str) || cupcakesArray;
		return cupcakesArray;
	};

	this.addCupcake = function(pItem) {
		cupcakesArray.push(pItem);
		var str = JSON.stringify(cupcakesArray);
		localStorage.setItem('CupcakesLS', str);
	};

	this.removeCupcake = function(pIndex) {
		cupcakesArray.splice(pIndex, 1);
		var str = JSON.stringify(cupcakesArray);
		localStorage.setItem('CupcakesLS', str);
	};
});