<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>CI3 + AngularJS</title>


    
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		
	
	<!-- jQuery and jQuery UI -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
	<!-- Angular JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>  
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular-route.min.js"></script>
    <script src="<?php echo base_url('assets/js/app/app.js'); ?>"></script>
    <script src="<?php echo base_url('assets/js/app/controllers/UserController.js'); ?>"></script>
    <script src="<?php echo base_url('assets/js/app/controllers/LoginController.js'); ?>"></script>
    <script src="<?php echo base_url('assets/js/app/controllers/DashboardController.js'); ?>"></script>
    <script src="<?php echo base_url('assets/js/app/controllers/PostController.js'); ?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/ng-file-upload@12.0.4/dist/ng-file-upload.min.js"></script>

	<!-- Toastr CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
<!-- Toastr JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">


    <style>
        button:hover {
            background: #218838;
        }
        .error {
            color: red;
            font-size: 12px;
        }
    </style>
	
</head>
<body ng-controller="MainController">

    <!-- Navbar -->

    <!-- ng-controller="DashboardController" -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
   <div class="container-fluid">
      <a class="navbar-brand" href="#">ANGULAR APP</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
         <ul class="navbar-nav ms-auto">
            <li class="nav-item">
               <a class="nav-link active" aria-current="page" href="#/">Home</a>
               {{isLoggedIn}}
            </li>
            <!--  -->

            <li ng-if="isLoggedIn" class="nav-item">
               <a class="nav-link "  href="#/posts">Posts </a>
            </li>
            <li ng-if="isLoggedIn" class="nav-item">
               <a class="nav-link "  href="#/users">Users </a>
            </li>
            <!--  -->
            <!-- <li ng-if="isLoggedIn" class="nav-item">
               <a class="nav-link "  href="#/addusers">Add User</a>
            </li> -->
            <!--  -->
            <li ng-if="!isLoggedIn" class="nav-item">
               <a class="nav-link "  href="#/login">Login</a>
            </li>
            <!--  -->
            <li ng-if="isLoggedIn" class="nav-item">
               <a class="nav-link "  href="#/dashboard">Dashboard</a>
            </li>
            <!--  -->
            <li ng-if="isLoggedIn" class="nav-item">
               <a class="nav-link "  href="#" ng-click="logout()">Logout</a>
            </li>
         </ul>
      </div>
   </div>
</nav>


    <!-- Main Content -->
    <div class="container mt-4">


        <!-- <ng-view></ng-view> -->
        <div ng-view>
</div>
    </div>
    




</body>
</html>