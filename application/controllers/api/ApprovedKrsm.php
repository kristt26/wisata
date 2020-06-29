<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class ApprovedKrsm extends \Restserver\Libraries\REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Approved_model', 'ApprovedModel');
    }

    public function ambilTemKrsm_get()
    {
        header("Access-Control-Allow-Origin: *");
        $Output = $this->JadwalModel->GetTemKrsm();
        return $Output;
        // $this->load->library('Authorization_Token');

        // $is_valid_token = $this->authorization_token->validateToken();
        // if ($is_valid_token['status'] === true) {
        //     $Output = $this->JadwalModel->fetch_all_jadwal($is_valid_token['data']->id);
        //     if (!empty($Output && $Output != false)) {

        //     }
        // }
    }
}