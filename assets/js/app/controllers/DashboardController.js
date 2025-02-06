app.controller('DashboardController', function($scope,$http, $window,$location){


     // Redirect to login if not logged in
     if (!localStorage.getItem("user")) {
         $location.path('/login');
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
