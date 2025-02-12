
app.controller('PostController', function($scope,$http,$rootScope,$window,$location){
   
    $scope.posts=[];
    $scope.categories=[];
    $scope.post={};
    $scope.files = []; // Initialize files array



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

      // Handle file selection
    //   var blog_formdata = new FormData();
    //   $scope.getFiles = function(files) {
    //     console.log("Selected Files:", files); // Debugging step

    //     if (!files || files.length === 0) {
    //         console.log("No files selected!");
    //         return;
    //     }
    
    //     blog_formdata.delete('post_image'); // Ensure only one image is appended
    //     angular.forEach(files, function(value, key) {
    //         blog_formdata.append('post_image', value);
    //     });
    //     $scope.$apply(); 
    //     console.log("File appended:", blog_formdata.get('post_image')); // Debugging step

    //   };

    var formData = new FormData(); // Create FormData object

    // Function to handle file selection
    $scope.uploadFile = function(file) {
        console.log("Selected file:", file);

        if (file) {
            formData.delete('file'); // Remove old file if exists
            formData.append('file', file); // Append new file
        }
    };

    $scope.addPost=function(){

        if (!$scope.post || !$scope.post.title) {
            alert("Please enter a name!");
            return;
        }

     
        formData.append('title', $scope.post.title);
        formData.append('description', $scope.post.description);
        formData.append('category_id', $scope.post.category_id);

       // blog_formdata.append('image', $scope.post.image);

        // console.log("formData Content:",formData);
        // formData.forEach((value, key) => {
        //     console.log(key ,':', value);
        // });
    
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
                    }else{
                        toastr.error(response.data.message);
                    }			
        },function (error){
            toastr.error(error);
        }); 
  
    }
   
});
