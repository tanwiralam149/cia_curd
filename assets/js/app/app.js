var app = angular.module('myApp', ['ngRoute']);
var v = Math.random(); 

console.log(v);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'assets/templates/home.html?v='+v,
            controller: 'UserController'
        })
        .when('/users', {
            templateUrl: 'assets/templates/user_list.html?v='+v,
            controller: 'UserController'
        })
        .when('/addusers', {
            templateUrl: 'assets/templates/add_user.html?v='+v,
            controller: 'UserController'
        })
        .when('/edituser/:id', {
            templateUrl: 'assets/templates/update_user.html?v='+v,
            controller: 'UserController'
        })
        .otherwise({ redirectTo: '/' });
});