app.controller('LoginController', function($scope,$http, $window, $location,$rootScope){
    
 

    $scope.user = {};
    $scope.isProcessing = false;

    $scope.userLogin=function(){
        $scope.isProcessing = true; // Disable button when request starts
      
            var postData = {
                email: $scope.user.email,
                password: $scope.user.password,
            };
         
            console.log($scope.user);
            $http({ url:"http://localhost/cia_curd/index.php/login/checkLogin", 
                data: postData,
                method: 'POST',
                timeout: 30000, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
           }).then(function(response) {
                if (response.data.status === "success") {
                    toastr.success(response.data.message, "Success!");
                    
                    // $window.localStorage.setItem('user', JSON.stringify(response.data.user));
                    // $rootScope.isLoggedIn = true;
                    // $window.location.href = "#/dashboard";

                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    $rootScope.isLoggedIn = true;
                    $location.path('/dashboard');
                   
                } else {
                    toastr.error(response.data.message, "Error!");
                }
                $scope.isProcessing = false; // Enable button when request completes
            }, function(error) {
                console.error("Error:",error);
                toastr.error("Something went wrong. Please try again.", "Error!");
                $scope.isProcessing = false;
            });

      
        
    }
});
