<?php 
defined('BASEPATH') OR exit('No direct script access allowed');


class Users extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('User_model');
        $this->load->library('email');
        $this->load->library('upload');
    }

    public function getAllSkill(){
        try{
            $skills = $this->User_model->get_all_skill();
            if (!empty($skills)) {
                echo json_encode(["status"=>true, "skills" => $skills]);
            } else {
                echo json_encode(["status"=>false, "message" => "No skills found"]);
            }
        }catch (Exception $e) {
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }
    }

    public function get_all_country()
	{
        try{
            $countries = $this->User_model->get_country();
            if (!empty($countries)) {
                echo json_encode(["success"=>1, "countries" => $countries]);
            } else {
                echo json_encode(["success"=>0, "message" => "No countries found"]);
            }
        }catch(Exception $e){
            echo json_encode(["success" => 0, 'message' => $e->getMessage()]);
        }
       
	}

  public function get_all_users(){
       $users = $this->User_model->get_users();
        if (!empty($users)) {
            echo json_encode(["success"=>1, "users" => $users]);
        } else {
            echo json_encode(["success"=>0, "message" => "No users found"]);
        }
  }

    public function userRegister() {
        $postData = json_decode(file_get_contents("php://input"), true);

       //print_r($postData);
        try {

            if (empty($postData['name']) || empty($postData['email']) || empty($postData['phone']) || 
            empty($postData['address']) || empty($postData['dob']) || empty($postData['gender']) || 
            empty($postData['country']) || empty($postData['countryCode']) || empty($postData['skills'])) {
                 echo json_encode(["status" => "error", "message" => "All fields are required"]);
                return;
               // throw new Exception(validation_errors(), 400);
            }

            $data = array(
                'name' => $postData['name'],
                'email' => $postData['email'],
                'phone' => $postData['phone'],
                'address' => $postData['address'],
                'dob' => $postData['dob'],
                'gender' => $postData['gender'],
                'country' => $postData['country'],
                'countryCode' => $postData['countryCode'],
                'agree' => $postData['agree'],
            );
    
            $user_id = $this->User_model->insertUser($data);
          
            if ($user_id) {
                $this->User_model->saveUserSkills($user_id, $postData['skills']);
                /*Send Mail After User Register successfully */
                  // Load email template with user data

                  $user_data = array(
                    'name'  => $postData['name'],
                    'email' => $postData['email'],
                    'phone' => $postData['phone']
                 );
        
                 $email_message = $this->load->view('email_templates', $user_data, TRUE);

                    $config = Array(
                        'protocol' => 'smtp',
                        'smtp_host' => 'sandbox.smtp.mailtrap.io',
                        'smtp_port' => 587 ,
                        'smtp_user' => '8fb617cf37c10a',
                        'smtp_pass' => '3866d1b90babd1',
                        'smtp_crypto' => 'tls',
                        'crlf' => "\r\n",
                        'newline' => "\r\n",
                        'mailtype'  => 'html',
                        'charset'   => 'utf-8',
                       
                    );
                                    
                $this->email->initialize($config);
                $this->email->set_newline("\r\n");
                $this->email->from('webgrity149@gmail.com', 'CI ANGULAR');
                $this->email->to($postData['email']);
                $this->email->subject('Registration Successfully!');
                $this->email->message($email_message);
                // $this->email->subject('Registration Successful');
                // $this->email->message('<p>Thank you for registering!</p>');
                
                if ($this->email->send()) {
                    //echo "Email sent successfully";
                    echo json_encode(["status" => "success", "message" => "User registered successfully, Email send!"]);
                } else {
                   // echo $this->email->print_debugger();
                  echo json_encode(["status" => "success", "message" => "User registered successfully"]);
                }
                
                //echo json_encode(["status" => "success", "message" => "User registered successfully!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to register user."]);
            }

        }catch (Exception $e) {
            // Handle exceptions
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }

      
    } 
    
    public function edit_user(){
        $postData = json_decode(file_get_contents("php://input"), true);
        try{
           
            $user=$this->User_model->getUserById($postData);
            if($user){
                echo json_encode(["status" => "success", "user"=>$user]);
            }else{
                echo json_encode(["status" => "error", "message" => "User details not get successfuly!"]);
            }
         
         }catch (Exception $e) {
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }
    }

    public function getLoginUserData(){
        $postData = json_decode(file_get_contents("php://input"), true);
        try{
           
            $user=$this->User_model->getLoginUser($postData);
            if($user){
                echo json_encode(["status" => "success", "user"=>$user]);
            }else{
                echo json_encode(["status" => "error", "message" => "User details not get successfuly!"]);
            }
         
         }catch (Exception $e) {
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }
    }

    public function getCountryById(){
        $postData = json_decode(file_get_contents("php://input"), true);
        try{
            $country=$this->User_model->getCountryById($postData);
            if($country){
                echo json_encode(["status" => "success", "country"=>$country]);
            }else{
                echo json_encode(["status" => "error", "message" => "Country details not get successfuly!"]);
            }
         
         }catch (Exception $e) {
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }
    }


    public function uploadFile(){
        header('Content-Type: application/json');
        $userId=$_POST['id'];
        $timestamp = date("Ymd_His");
        if (!empty($_FILES['file']['name'])) {
            $uploadPath = './uploads/';
            $config['upload_path'] = $uploadPath;
            $config['allowed_types'] = 'jpg|jpeg|png|gif|'; // Allowed file types
            $config['max_size'] = 2048;  // 2MB max file size
            $config['file_name'] = $timestamp . "-" . $_FILES['file']['name'];
           // $config['encrypt_name'] = TRUE; // Encrypts file name to prevent conflicts
    
            $this->upload->initialize($config);
    
            if (!$this->upload->do_upload('file')) {
                echo json_encode(["status" => false, "message" => $this->upload->display_errors()]);
            } else {
                $fileData = $this->upload->data();
               
                // Insert into database
                $data = array(
                    'image' =>$fileData['file_name'],
                );
                $file = 'uploads/'. $fileData['file_name'];
    
                if ($this->User_model->updateUser($userId, $data)) {
                    echo json_encode(["status" => true,"message"=>'File Uploaded successfully',"image_path"=>base_url($file)]);
                } else {
                    echo json_encode(["status" => false, "message" => "DB insert failed"]);
                }
            }
        }else{
            echo json_encode(["status" => false, "message" => 'File is required']);
        }
      
    }

    public function updateUserRegister() {
    
       $postData = json_decode(file_get_contents("php://input"), true);
      // print_r($postData);

        try {
            if (empty($postData['name']) || empty($postData['email']) || empty($postData['phone']) || 
            empty($postData['address']) || empty($postData['dob']) || empty($postData['gender']) || 
            empty($postData['country']) || empty($postData['countryCode']) || empty($postData['skills'])) {
                echo json_encode(["status" => "error", "message" => "All fields are required"]);
                return;
            }

            $data = array(
                'name' => $postData['name'],
                'email' => $postData['email'],
                'phone' => $postData['phone'],
                'address' =>$postData['address'],
                'dob' => $postData['dob'],
                'gender' =>$postData['gender'],
                'country' =>$postData['country'],
                'countryCode' =>$postData['countryCode'],
                'agree' => $postData['agree'],
            );
    
            $update = $this->User_model->updateUser($postData['id'],$data);
    
            if ($update) {
                $this->User_model->saveUserSkills($postData['id'], $postData['skills']);
                echo json_encode(["status" => "success", "message" => "User updated successfully!"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update user."]);
            }

        }catch (Exception $e) {
            // Handle exceptions
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }

    } 
    public function deleteUser() {
        $postData = json_decode(file_get_contents("php://input"), true);
        ///$id = json_decode(file_get_contents("php://input"), true)["id"];
        try{
            $id =$this->input->post('id');
            if($this->User_model->deleteUser($postData)){
                echo json_encode(["status" => "success", "message" => "User deleted successfully!","id"=>$id,"data"=>$postData]);
            }else{
                echo json_encode(["status" => "error", "message" => "User not deleted successfully!","id"=>$id,"data"=>$postData]);
            }
         
         }catch (Exception $e) {
            echo json_encode(["status" => "error", 'message' => $e->getMessage()]);
        }
      
    }
   
}