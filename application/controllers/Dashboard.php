<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {
	public function __construct() {
        parent::__construct();
    }
    // **Logout Method**
    public function logout() {
        $this->session->sess_destroy();
        echo json_encode(['status' => 'success', 'message' => 'Logout successful']);
    }
}
