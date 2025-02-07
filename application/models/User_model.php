<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {
    
    /* Get All Skills */
    public function get_all_skill(){
        return $this->db->get('skill')->result_array();
    }
    public function insertUser($data){
         $this->db->insert('user', $data);
         return $this->db->insert_id();
    }

    public function get_country(){
        return $this->db->get('country')->result_array();
    }

    public function getCountryById($id){
        return $this->db->get_where('country',['id' => $id])->row_array();
    }
    public function get_users(){
        $this->db->select('user.*, country.name');
        $this->db->join('country','country.id=user.country','left');
        $users=$this->db->get('user')->result_array();
        foreach($users as &$user){
            $user['skills']=$this->getUserAllSkill($user['id']);
        }
        return $users;
    }


    

    public function getUserAllSkill($user_id){
        $this->db->where('user_id', $user_id);
        $query = $this->db->get('user_skill');
        return $query->result_array(); // Return skills as an array
    }


  /*  public function getAllUsers() {
        $this->db->select('u.id, u.name, u.email, u.phone, u.gender, u.country, u.dob');
        $this->db->from('users u');
        $query = $this->db->get();
        $users = $query->result_array();

        foreach ($users as &$user) {
            $user['skills'] = $this->getUserSkills($user['id']);
        }

        return $users;
    }
    // Get skills of a user
    public function getUserSkills($user_id) {
        $this->db->select('s.id, s.name');
        $this->db->from('user_skills us');
        $this->db->join('skills s', 'us.skill_id = s.id');
        $this->db->where('us.user_id', $user_id);
        $query = $this->db->get();

        return $query->result_array(); // Return skills as an array
    }   */



      // Save User Skills
      public function saveUserSkills($user_id, $skills) {
        if($skills){
            $this->db->where('user_id', $user_id)->delete('user_skill'); // Clear old skills
        }
    
        $allSkill=$this->db->get("skill")->result_array();
        foreach ($skills as $skill_id) {
            foreach($allSkill  as $row){
                 if($row['id']===$skill_id){
                    $this->db->insert('user_skill', [
                        'user_id' => $user_id,
                        'skill_id' => $skill_id,
                        'skill_name' =>$row['skill']
                    ]);
                 }
            }
        }
    }

   
    public function getUserById($id){
        $user=$this->db->get_where('user',['id' => $id])->row_array();
        foreach($user as &$row){
            $user['skills']=$this->getUserAllSkill($id);
        }
        return $user;
    }

    public function getLoginUser($id){
        $this->db->select('user.*,country.name as country_name');
        $this->db->join('country','country.id=user.country','left');
        $user=$this->db->get_where('user',['user.id' => $id])->row_array();
        foreach($user as &$row){
            $user['skills']=$this->getUserAllSkill($id);
        }
        return $user;
    }

    public function updateUser($id, $data) {
        $this->db->where('id', $id); // Specify the user ID to update
        return $this->db->update('user', $data); // Perform the update
    }

    public function deleteUser($id) {
        if($id){
            $this->db->where("id", $id);
            $this->db->delete("user");
            return true;
        }else{
            return false;
        }
    }
    
}





