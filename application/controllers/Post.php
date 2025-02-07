<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post extends CI_Controller {
	public function __construct() {
        parent::__construct();
        $this->load->model('Post_model');
    }

    public function getAllCategory(){
        try{
           $categories=$this->Post_model->get_categories();
           if($categories){
            echo json_encode(['status'=>true,'categories'=>$categories]);
           }else{
            echo json_encode(['status'=>false,'message'=>'Categories not found','data'=>'']);
           }
        }catch(Exception $e){
            echo json_encode(["status" => false, 'message' => $e->getMessage()]);
        }
    }

    public function savePost(){
        header('Content-Type: application/json');
        print_r($this->input->post());

        $title=$this->input->post('title');
        $category_id=$this->input->post('category_id');
        $description=$this->input->post('description');
        
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
}
