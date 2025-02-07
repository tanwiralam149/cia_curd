app.controller('PostController', function($scope,$http,$rootScope,$window,$location){
   
    $scope.posts=[];
    $scope.categories=[];
    $scope.post={};


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

       // File upload (no directive)
    $scope.selectImage = function (files) {
        $scope.post.image = files[0];

        console.log($scope.post.image);
    };

    $scope.addPost=function(){
        var formData = new FormData();
        formData.append('title', $scope.post.title);
        formData.append('category_id', $scope.post.category_id);
        formData.append('description', $scope.post.description);
        formData.append('image', $scope.post.image);

       $http.post("http://localhost/cia_curd/index.php/post/savePost", formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            if (response.data.status) {
                toastr.success(response.data.message);
            } else {
                toastr.error(response.data.message);
            }
        });


        //var postImage = document.getElementById('postImage');
       // var file = postImage.files[0];
        // var file = $('#postImage')[0].files;
        // if (!file) {
        //     alert("Please select a file first.");
        //     return;
        // }
        // var formData = new FormData();
        // formData.append("file", file);
        // formData.append("title", $scope.post.title);
        // formData.append("category_id", $scope.post.category_id);
        // formData.append("description", $scope.post.description);
        
        // $http.post("http://localhost/cia_curd/index.php/post/savePost", formData, {
        //     transformRequest: angular.identity,
        //     headers: { 'Content-Type': undefined }
        // }).then(function(response) {
        //     if (response.data.status) {
        //         toastr.success(response.data.message);
        //     } else {
        //         toastr.error(response.data.message);
        //     }
        // });
       
    }
   
});
