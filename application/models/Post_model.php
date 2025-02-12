<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post_model extends CI_Model {
    public function get_categories(){
        $query=$this->db->get("category");
        return $query->result_array();
    }

    public function insertPost($data){
        $this->db->insert('post', $data);
        return $this->db->insert_id();
   }

   public function get_posts(){
        $this->db->select('post.*, category.category_name');
        $this->db->join('category','category.category_id=post.category_id','left');
        $query=$this->db->get('post');
        return $query->result_array();
   }

   public function updatePost($id,$data){
        $this->db->where('id', $id); // Specify the user ID to update
        $this->db->update('post', $data); // Perform the update
        return $this->db->affected_rows();
       //return $this->db->last_query();
   }

   public function getPostById($id){
    return $this->db->get_where('post',['id' => $id])->row_array();
   }

   public function deletePost($id) {
    if($id){
        $this->db->where("id", $id);
        $this->db->delete("post");
        return true;
    }else{
        return false;
    }
}

/*FOR FRONTEND */
   

public function fetch_blogs($limit, $offset, $search) {
    $this->db->select('post.*, category.category_name')->from('post');
    $this->db->join('category','category.category_id=post.category_id','left');
    if (!empty($search)) {
        $this->db->like('title', $search);
        $this->db->or_like('description', $search);
    }

    $this->db->limit($limit, $offset);
    return $this->db->get()->result();
}

public function count_blogs($search) {
    $this->db->from('post');

    if (!empty($search)) {
        $this->db->like('title', $search);
        $this->db->or_like('description', $search);
    }

    return $this->db->count_all_results();
}

}





