<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post_model extends CI_Model {
    public function get_categories(){
        $query=$this->db->get("category");
        return $query->result_array();
    }
}





