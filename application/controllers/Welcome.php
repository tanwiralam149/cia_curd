<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
	public function __construct() {
        parent::__construct();
        $this->load->model('User_model');
    }
	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function get_all_country()
	{
		// $country = $this->User_model->get_country();
		// echo json_encode(array("success"=>1, 'msg'=>'success', 'country'=>$country));
		// exit();


        $country = $this->User_model->get_country();
        
        if (!empty($country)) {
            echo json_encode(["success"=>1, "data" => $country]);
        } else {
            echo json_encode(["success"=>0, "message" => "No countries found"]);
        }

	}
}
