	'use strict';
	// create the module and name it scotchApp
	angular.module('scotchApp', ['ngRoute', 'datatables', 'datatables.buttons'])

	// configure our routes
	.config(function($routeProvider) {
	    $routeProvider
	    // route for the home page
	        .when('/home', {
	        templateUrl: 'pages/login.html',
	        controller: 'mainController'
	    })

	    // route for the about page
	    .when('/tables', {
	        templateUrl: 'pages/tables.html',
	        controller: 'TablesController',
	        controllerAs: 'tables'
	    })

	    // route for the contact page
	    // .when('/contact', {
	    // 	templateUrl : 'pages/contact.html',
	    // 	controller  : 'contactController'
	    // })
	    .otherwise({
	        redirectTo: '/contact'
	    });
	})