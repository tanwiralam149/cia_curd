<?php 


class Login_model extends CI_Model{
    public function login_user($email, $password) {
        $this->db->where('email', $email);
        $query = $this->db->get('user');

        if ($query->num_rows() == 1) {
            $user = $query->row();

            // Verify password
            if (password_verify($password, $user->password)) {
                return $user;
            }
        }
        return false;
    }

    public function check_login($email, $password) {
        $this->db->where('email', $email);
        $this->db->where('password', $password); // Use hashing for security
        $query = $this->db->get('user'); // Assuming your table is `users`
        
        if ($query->num_rows() > 0) {
            return $query->row();
        } else {
            return false;
        }
    }


}