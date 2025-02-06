app.controller('UserController', function($scope, $http,$routeParams,$location) {


    if (!localStorage.getItem("user")) {
        $location.path('/login');
    }

   // $scope.user = {};
    $scope.user = { skills: [] };
    $scope.countries = [];
    $scope.submitted = false;
    $scope.isEditing = false; // Track whether we are updating a user
    $scope.country=''; 
    $scope.countryCode=''; 
    $scope.code=''; 
    $scope.errors = {};
    $scope.skills={};
    $scope.selectedSkills = [];
    $scope.isProcessing = false; // Button state

    

    $scope.validateForm = function () {
        $scope.errors = {}; // Reset errors
        // Name Validation
        if (!$scope.user.name) {
            $scope.errors.name = "Name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test($scope.user.name)) {
            $scope.errors.name = "Name should contain only alphabets.";
        }
        // Email Validation
        if (!$scope.user.email) {
            $scope.errors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test($scope.user.email)) {
            $scope.errors.email = "Invalid email format.";
        }
        // Phone Validation
        if (!$scope.user.phone) {
            $scope.errors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test($scope.user.phone)) {
            $scope.errors.phone = "Phone number must be exactly 10 digits.";
        }
        //Country 
        if (!$scope.user.country) {
            $scope.errors.country = "Country is required.";
        }
          //Address 
        if (!$scope.user.address) {
            $scope.errors.address = "Address is required.";
        }
        //DOB 
        if (!$scope.user.dob) {
            $scope.errors.dob = "DOB is required.";
        }
        //Gender 
        if (!$scope.user.gender) {
            $scope.errors.gender = "Gender is required.";
        }
        //skills 
        if (!$scope.user.skills) {
            $scope.errors.skills = "Skill is required.";
        }
         //agree 
        if (!$scope.user.agree) {
            $scope.errors.agree = "please check ";
        }
        return Object.keys($scope.errors).length === 0; // Return true if no errors
    };


    $scope.getSkill = function() {
        $http({ url:"http://localhost/cia_curd/index.php/users/getAllSkill", data: '', method: 'GET', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(response) {
                if (response.data.status) {
                   
                    $scope.skills = response.data.skills;
                   
                } else {
                    toastr.error(response.data.message);
                }
            });
    }

    $scope.getCountry = function() {
        $http({ url:"http://localhost/cia_curd/index.php/users/get_all_country", data: '', method: 'GET', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(response) {
                if (response.data.success == 1) {
                    console.log(response);
                    $scope.countries = response.data.countries;
                   
                } else {
                    toastr.error('Unable to process your request');
                }
            }, function(error) {
                //toastr.error(error);
            });
    }

    $scope.onCountryChange=function(){

        var countryId=$scope.user.country;
        if($scope.user.country){

            $http({ url:"http://localhost/cia_curd/index.php/users/getCountryById", data:countryId , method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(response) {
                if (response.data.status) {
                    $scope.user.countryCode= response.data.country.phonecode;
                    $scope.user.countryName=response.data.country.name;
                } else {
                    toastr.error('Unable to process your request');
                }
            }, function(error) {
                //toastr.error(error);
            });
        }
    }
    

    $scope.getAllUsers = function() {
        
        $http({ url:"http://localhost/cia_curd/index.php/users/get_all_users", data: '', method: 'GET', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(response) {
                if (response.data.success == 1) {
                    $scope.users = response.data.users;
                } else {
                    toastr.error(response.data.message);
                }
            }, function(error) {
                toastr.error(error);
            });
    }

    $scope.isAgreeCheck=function(val){
        return val=='1' ? true :false;
    }

    $scope.registerUser=function(){
        $scope.submitted = true; // Set flag to show errors
        $scope.isProcessing = true; // Disable button when request starts
        if ($scope.validateForm()) {
            var postData = {
                name: $scope.user.name,
                email: $scope.user.email,
                phone: $scope.user.phone,
                address: $scope.user.address,
                dob: $scope.user.dob,
                gender: $scope.user.gender,
                country: $scope.user.country,
                countryCode: $scope.user.countryCode,
                skills: $scope.user.skills,
                agree:$scope.user.agree 
            };
         
            console.log($scope.user);
            $http({ url:"http://localhost/cia_curd/index.php/users/userRegister", 
                data: postData,
                method: 'POST',
                timeout: 30000, 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
           }).then(function(response) {
                if (response.data.status === "success") {
                    toastr.success(response.data.message, "Success!");
                    $scope.user = {};
                    $scope.submitted = false; // Reset validation flag
                    $location.path("/users"); 
                } else {
                    toastr.error(response.data.message, "Error!");
                }
                $scope.isProcessing = false; // Enable button when request completes
            }, function(error) {
                console.error("Error:", error);
                toastr.error("Something went wrong. Please try again.", "Error!");
                $scope.isProcessing = false;
            });

        }else {
            alert("Please fix the errors before submitting.");
            $scope.isProcessing = false;
        }
  
    }
    
    $scope.isSkillSelected=function(skillId){
        return $scope.selectedSkills.includes(skillId);
    }


    $scope.editUser=function(){
        var userId = $routeParams.id;
        $http({ url:"http://localhost/cia_curd/index.php/users/edit_user", data: userId, method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function(response) {
            if (response.data.status) {
               
                $scope.user = response.data.user;

                $scope.selectedSkills = response.data.user.skills.map(skill => skill.skill_id);
                $scope.user={
                    id:response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    phone: response.data.user.phone,
                    address: response.data.user.address,
                    dob: response.data.user.dob,
                    gender: response.data.user.gender,
                    country: response.data.user.country,
                    countryCode: response.data.user.countryCode,
                    agree:response.data.user.agree,
                    skills:response.data.user.skills
                };
                console.log("EDIT USER DATA",$scope.user);
            } else {
                toastr.error(response.data.message);
            }
        }, function(error) {
            toastr.error(error);
        });
    }

   $scope.updateRegisterUser=function(){
        $scope.submitted = true; // Set flag to show errors
        $scope.isProcessing = true; // Enable button when request completes
        if ($scope.validateForm()) {
           
            var postData = {
                id: $scope.user.id,
                name: $scope.user.name,
                email: $scope.user.email,
                phone: $scope.user.phone,
                address: $scope.user.address,
                dob: $scope.user.dob,
                gender: $scope.user.gender,
                country: $scope.user.country,
                countryCode: $scope.user.countryCode,
                skills: $scope.user.skills,
                agree:$scope.user.agree 
            };
    
        console.log($scope.user);
        $http({ url:"http://localhost/cia_curd/index.php/users/updateUserRegister", 
            data: postData,
            method: 'POST',
            timeout: 30000, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
       }).then(function(response) {
            if (response.data.status === "success") {
                toastr.success(response.data.message, "Success!");
                $scope.user = {};
                $scope.submitted = false; // Reset validation flag
                $location.path("/users"); 
            } else {
                toastr.error(response.data.message, "Error!");
            }
            $scope.isProcessing = false; // Enable button when request completes
        }, function(error) {
            console.error("Error:", error);
            toastr.error("Something went wrong. Please try again.", "Error!");
            $scope.isProcessing = false; // Enable button when request completes
        });
        }else{
         alert('Please filled all required field');
       
        }
  
   }


    $scope.deleteUser = function (id) {
        if (confirm("Are you sure you want to delete this user?")) {
                $http({ url:"http://localhost/cia_curd/index.php/users/deleteUser", data: id, method: 'POST', timeout: 30000, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function(response) {
                    if (response.data.status=='success') {
                        $scope.getAllUsers();
                        toastr.success(response.data.message, "Success!");
                    } else {
                        toastr.error(response.data.message, "Error!");
                    }
                }, function(error) {
                    toastr.error(response.data.message, "Error!");
                });   
        }
    };
});