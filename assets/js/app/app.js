var app = angular.module('myApp', ['ngRoute','ngFileUpload']);
var v = Math.random(); 


app.config(function($routeProvider) {
    $routeProvider
       
        .when('/', {
            templateUrl: 'assets/templates/blog.html?v='+v,
            controller: 'HomeController'
        })
        .when('/blog/:id', {
            templateUrl: 'assets/templates/blog-detail.html?v='+v,
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



app.controller('HomeController',function($scope,$http,$rootScope,$routeParams){
    $rootScope.baseUrl='http://localhost/cia_curd/';

    $scope.post={};



    $scope.posts = [];
    $scope.totalPosts = 0;
    $scope.perPage = 5; // Number of posts per page
    $scope.currentPage = 1;
    $scope.searchQuery = '';

  
    $scope.fetchBlogs=function(offset){
        $http({ url:"http://localhost/cia_curd/index.php/post/getAllFrontPost", params: {
            limit: $scope.perPage,
            offset: offset,
            search: $scope.searchQuery
        }, method: 'GET', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
           // if (response.data.status) {
               // $scope.posts = response.data.posts;
                $scope.posts = response.data.posts;
                $scope.totalPosts = response.data.total;
                $scope.totalPages = Math.ceil($scope.totalPosts / $scope.perPage);
                console.log("totalPosts",$scope.totalPosts);
                console.log("totalPages",$scope.totalPages);

            // } else {
            //     toastr.error(response.data.message);
            // }
        }, function(error) {
            toastr.error(error);
        });
    }

    // Change Page
    $scope.changePage = function(page) {
        if (page < 1 || page > $scope.totalPages) return;
        $scope.currentPage = page;
        $scope.fetchBlogs(($scope.currentPage - 1) * $scope.perPage);
    };

    // Generate Page Numbers
    $scope.getPages = function() {
        return new Array($scope.totalPages).fill(0).map((_, i) => i + 1);
    };

    // Initial Fetch
    $scope.fetchBlogs(0);




    $scope.blogDetail=function(){
        var postId = $routeParams.id;

        $http({ url:"http://localhost/cia_curd/index.php/post/editPost", data: postId, method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
            if (response.data.status) {
                $scope.post = response.data.post;
            } else {
                toastr.error(response.data.message);
            }
        }, function(error) {
            toastr.error(error);
        });
    }
    
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








