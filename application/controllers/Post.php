<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post extends CI_Controller {
	public function __construct() {
        parent::__construct();
        $this->load->model('Post_model');
        $this->load->library('form_validation');
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



    public function savePost() {
 
        header("Content-Type: application/json"); // Force JSON response
         // print_r($this->input->post('key'));
         
      //  try {
         
            $title        = $this->input->post('title');
            $category_id  = $this->input->post('category_id');
            $description  = $this->input->post('description');

          
            if (empty($title) || empty($category_id) || empty($description)) {
               // throw new Exception("All fields are required!!!", 400);
               echo json_encode(["status" => false, "message" => "All fields are required!!!"]);
            }

           
            $upload_path = './uploads/post';
       
            $file_path = null;
            if (!empty($_FILES['file']['name'])) {
                $config['upload_path']   = $upload_path;
                $config['allowed_types'] = 'jpg|jpeg|png|gif';
                $config['max_size']      = 2048;
                $config['file_name']     = time() . '_' . $_FILES['file']['name'];

                $this->load->library('upload', $config);

                if ($this->upload->do_upload('file')) {
                    $uploadData = $this->upload->data();
                    $file_path  = base_url('uploads/post/' . $uploadData['file_name']);
                } else {
                    //throw new Exception($this->upload->display_errors(), 500);
                    echo json_encode(["status" => false, "message" => $this->upload->display_errors()]);
                }
            } else {
                //throw new Exception("No file uploaded!", 400);
                echo json_encode(["status" => false, "message" => "No file uploaded!"]);
            }  

            //  Insert into database
            $data = [
                'title'        => $title,
                'category_id'  => $category_id,
                'description'  => $description,
                'image'   => $uploadData['file_name']
            ];

            $insert_id = $this->Post_model->insertPost($data);

            if ($insert_id) {
                echo json_encode(["status" => true, "message" => "Post added successfully!", "post_id" => $insert_id]);
            } else {
                echo json_encode(["status" => false, "message" => "Post not added successfully!"]);
              //  throw new Exception("Database insert failed", 500);
            }

      //  } catch (Exception $e) {
           // echo json_encode(["status" =>false, "message" => $e->getMessage()]);
      //  }
    }


}
