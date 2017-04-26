var app = angular.module('cupcakeApp', ['ngRoute']);

// Defining routes
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
		}).otherwise({ redirectTo: '/list' }); // If nothing above matched request, redirect to /list
});

// List controller
app.controller('listCtrl', function($scope, cupcakeSrv){
	$scope.cupcakes = {};
	$scope.cupcakesArray = cupcakeSrv.getCupcakes();
	$scope.removeCupcake = function(pIndex) {
		cupcakeSrv.removeCupcake(pIndex);
	}
});

// Form controller
app.controller('formCtrl', function($scope,cupcakeSrv){
	$scope.addCupcake = function() {
		cupcakeSrv.addCupcake($scope.cupcakes);
		$scope.cupcakes = '';
		document.location.hash = '#!/list';
	}
});

// Details controller
app.controller('detailsCtrl', function($scope, cupcakeSrv, $routeParams){
	$scope.cupcakes = cupcakeSrv.getCupcakesAt($routeParams.cupcakeIdx);
});

// Create and delete
app.service('cupcakeSrv', function(){
	var cupcakesArray = [];

	// Get specific item
	this.getCupcakesAt = function(idx) {
		// Call get all items and pass needed id
		return this.getCupcakes()[idx];
	}

	// Get all items
	this.getCupcakes = function() {
		// Get item from browser's local storage
		var str = localStorage.getItem('CupcakesLS');
		// Parse object from local storage
		cupcakesArray = JSON.parse(str) || cupcakesArray;
		return cupcakesArray;
	};

	// Create item
	this.addCupcake = function(pItem) {
		cupcakesArray.push(pItem);
		// Make a string out of object
		var str = JSON.stringify(cupcakesArray);
		// Save to browser's local storage
		localStorage.setItem('CupcakesLS', str);
	};

	// Delete item
	this.removeCupcake = function(pIndex) {
		// Remove 1 at index #
		cupcakesArray.splice(pIndex, 1);
		// Stringify new object
		var str = JSON.stringify(cupcakesArray);
		// Save to browser's local storage
		localStorage.setItem('CupcakesLS', str);
	};
});
