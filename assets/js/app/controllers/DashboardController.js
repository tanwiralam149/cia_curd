app.controller('DashboardController', function($scope,$http,$rootScope, $window,$location){

     $scope.user={}
     $scope.proFileData='';
     $scope.proFileData=localStorage.getItem("user");
     $scope.loginUser=$scope.proFileData ? JSON.parse($scope.proFileData) : '';
     
     $scope.baseUrl='http://localhost/cia_curd/';
      
     // Redirect to login if not logged in
     if (!localStorage.getItem("user")) {
         $location.path('/login');
    }
    
    $scope.getLoginUserDetail=function(){
        var userId = $scope.loginUser.id;
           
       // console.log("USER ID",userId);
        $http({ url:"http://localhost/cia_curd/index.php/users/getLoginUserData", data: userId, method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
            if (response.data.status) {
                $scope.user = response.data.user;
               // console.log("Dashboard Login USER DATA",$scope.user);
            } else {
                toastr.error(response.data.message);
            }
        }, function(error) {
            toastr.error(error);
        });
    }

    $scope.uploadProfileFile=function(){
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];

        if (!file) {
            alert("Please select a file first.");
            return;
        }
        var formData = new FormData();
        formData.append("file", file);
        formData.append("id", $scope.loginUser.id);
        console.log(formData);

        $http.post("http://localhost/cia_curd/index.php/users/uploadFile", formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            if (response.data.status) {
                toastr.success(response.data.message);
                $scope.getLoginUserDetail();
                $('#fileInput').val('');
            } else {
                toastr.error(response.data.message);
               // $scope.uploadError = true;
               // $scope.uploadMessage = "File upload failed!";
            }
        });
    }
    $scope.logout = function() {

        $http({ url:"http://localhost/cia_curd/index.php/dashboard/logout", 
            data: '',
            method: 'GET',
            timeout: 30000, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
       }).then(function(response) {
            if (response.data.status === "success") {
                toastr.success(response.data.message, "Success!");
               
                // $window.localStorage.removeItem('user');
                // $rootScope.isLoggedIn = false; // Update UI
                // $window.location.href = "#/login"; // Redirect to login page

                localStorage.removeItem("user");
                $rootScope.isLoggedIn = false;
                $location.path('/login');
              
            } else {
                toastr.error(response.data.message, "Error!");
            }
            $scope.isProcessing = false; // Enable button when request completes
        }, function(error) {
            console.error("Error:", error);
            toastr.error("Something went wrong. Please try again.", "Error!");
            $scope.isProcessing = false;
        });


    };


    
});
