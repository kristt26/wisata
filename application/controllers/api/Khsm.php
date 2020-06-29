<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/BaseFunction.php';

class Khsm extends \Restserver\Libraries\REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Khsm_model', 'KhsmModel');
    }

    public function GetKhsm_post()
    {
        header("Access-Control-Allow-Origin: *");

        $this->load->library('Authorization_Token');

        $is_valid_token = $this->authorization_token->validateToken();
        $a = json_decode($this->input->raw_input_stream);
        if ($is_valid_token['status'] === true) {
            $Output = $this->KhsmModel->AmbilKhs($a);
            if (!empty($Output && $Output != false)) {
                $message = [
                    'status' => true,
                    'data' => $Output,
                    'message' => "Success",
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            }
        }
    }
}