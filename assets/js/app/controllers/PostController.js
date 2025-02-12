
app.controller('PostController', function($scope,$http,$rootScope,$window,$location,$routeParams,$timeout){



    if (!localStorage.getItem("user")) {
        $location.path('/login');
    }
   
    $scope.posts=[];
    $scope.categories=[];
    $scope.post={};
    //$scope.files = []; // Initialize files array
    $rootScope.baseUrl='http://localhost/cia_curd/';


    $scope.getCategory=function(){
        $http({ url:"http://localhost/cia_curd/index.php/post/getAllCategory", data: '', method: 'GET', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
           
            if (response.data.status) {
                $scope.categories = response.data.categories;
                
            } else {
                toastr.error(response.message);
            }
        }, function(error) {
            toastr.error(error);
        });
    }


    var formData = new FormData(); // Create FormData object

    // Function to handle file selection
    $scope.uploadFile = function(file) {
        console.log("Selected file:", file);

        if (file) {
            formData.delete('file'); // Remove old file if exists
            formData.append('file', file); // Append new file
        }
    };

    $scope.getAllPosts=function(){
        $http({ url:"http://localhost/cia_curd/index.php/post/getAllPosts", data: '', method: 'GET', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
            if (response.data.status) {
                $scope.posts = response.data.posts;
               // console.log($scope.posts);
            } else {
                toastr.error(response.data.message);
            }
        }, function(error) {
            toastr.error(error);
        });
    }
    $scope.addPost=function(){

        if (!$scope.post || !$scope.post.title) {
            alert("Please enter a title!");
            return;
        }
        formData.append('title', $scope.post.title);
        formData.append('description', $scope.post.description);
        formData.append('category_id', $scope.post.category_id);

         $http({url: "http://localhost/cia_curd/index.php/post/savePost",
                data: formData, 
                method: 'POST',
                timeout: 30000, 
                headers: { 'Content-Type': undefined}, 
                transformRequest: angular.identity})
          .then(function(response) {
                    if(response.data.status){
                        console.log(response);
                        toastr.success(response.data.message);
                        $scope.post={};
                        $location.path("/posts"); 
                    }else{
                        toastr.error(response.data.message);
                    }			
        },function (error){
            toastr.error(error);
        }); 
  
    }

    $scope.editPost=function(){
        var postId = $routeParams.id;
        $http({ url:"http://localhost/cia_curd/index.php/post/editPost", data: postId, method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
            if (response.data.status) {
                $scope.post = response.data.post;
               
                $scope.getCategory();
                $scope.post.category_id =$scope.post.category_id;
               // console.log("EDIT Post DATA",$scope.post);
                $timeout(function() {
                    $scope.post.category_id = $scope.post.category_id;
                }, 100);
            } else {
                toastr.error(response.data.message);
            }
        }, function(error) {
            toastr.error(error);
        });
    }

    $scope.updatePost=function(){
        if (!$scope.post || !$scope.post.title) {
            alert("Please enter a title!");
            return;
        }
        formData.append('title', $scope.post.title);
        formData.append('description', $scope.post.description);
        formData.append('category_id', $scope.post.category_id);
        formData.append('id', $scope.post.id);

         $http({url: "http://localhost/cia_curd/index.php/post/upatePost",
                data: formData, 
                method: 'POST',
                timeout: 30000, 
                headers: { 'Content-Type': undefined}, 
                transformRequest: angular.identity})
          .then(function(response) {
                    if(response.data.status){
                        console.log(response);
                        toastr.success(response.data.message);
                        $scope.post={};
                        $location.path("/posts"); 
                    }else{
                        toastr.error(response.data.message);
                    }			
        },function (error){
            toastr.error(error);
        }); 
    }

    $scope.deletePost = function (id) {
       
        if (confirm("Are you sure you want to delete this post?")) {
                $http({ url:"http://localhost/cia_curd/index.php/post/deletePost", data: {id:id}, method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function(response) {
                    if (response.data.status) {
                       // $scope.getAllPosts();
                        $scope.posts = $scope.posts.filter(post => post.id !== id);
                        toastr.success(response.data.message);
                      
                    } else {
                        toastr.error(response.data.message);
                    }
                }, function(error) {
                    toastr.error(response.data.message);
                });   
        }
    };
   
});
