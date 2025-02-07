var app = angular.module('myApp', ['ngRoute']);
var v = Math.random(); 


app.config(function($routeProvider) {
    $routeProvider
       
        .when('/', {
            templateUrl: 'assets/templates/home.html?v='+v,
            controller: 'HomeController'
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
        .when('/login', {
            templateUrl: 'assets/templates/login.html?v='+v,
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'assets/templates/dashboard.html?v='+v,
            controller: 'DashboardController'
        })

        .when('/posts', {
            templateUrl: 'assets/templates/post/post_list.html?v='+v,
            controller: 'PostController'
        })
        .when('/post/add', {
            templateUrl: 'assets/templates/post/post_add.html?v='+v,
            controller: 'PostController'
        })
        .when('/post/edit/:id', {
            templateUrl: 'assets/templates/post/post_update.html?v='+v,
            controller: 'PostController'
        })
        .otherwise({ redirectTo: '/' });
});



app.controller('HomeController',function($scope){
     
});
// MainController to manage login state globally
app.controller('MainController', function($scope, $rootScope, $location) {
    $rootScope.isLoggedIn = localStorage.getItem("user") ? true : false;

    $scope.logout = function() {
        localStorage.removeItem("user");
        $rootScope.isLoggedIn = false;
        $location.path('/login');
    };
});
