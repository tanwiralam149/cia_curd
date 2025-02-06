<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
	public function __construct() {
        parent::__construct();
        $this->load->model('Login_model');
    }
	
    public function checkLogin(){
        $postData = json_decode(file_get_contents("php://input"), true);
       // print_r($postData);
        //  $email = $postData['email'];
        // $password = $postData['password'];
      
       if (!isset($postData['email']) || !isset($postData['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Email and Password are required']);
        return;
    }
        $user=$this->Login_model->check_login($postData['email'],$postData['password']);
        if($user){
            // Store user session
            $this->session->set_userdata([
                'user_id' => $user->id,
                'user_email' => $user->email,
                'user_name' => $user->name,
                'logged_in' => true
            ]);
            echo json_encode(['status' => 'success', 'message' => 'Login successful', 'user' => $user]);
            return;
        }
        echo json_encode(['status' => 'error', 'message' => 'Invalid Credentials']);
        return;
    }


}
