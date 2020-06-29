<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class Siswa extends \Restserver\Libraries\REST_Controller
{
    public function __construct($config = 'rest')
    {
        parent::__construct($config);
        $this->load->model('Siswa_model', 'SiswaModel');
    }

    public function GetSiswa_get()
    {
        $output = $this->SiswaModel->select(null);
        if($output){
            $this->response($output, REST_Controller::HTTP_OK);
        }
        
    }
    public function simpan_post()
    {
        $this->load->library('Authorization_Token');
        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
            $Output = $this->SiswaModel->insert($POST);
            if ($Output) {
                $this->response($Output, REST_Controller::HTTP_OK);
            }else{
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }else{
            $this->response(null, REST_Controller::HTTP_UNAUTHORIZED);
        }
    }
    public function ubah_put()
    {
        $this->load->library('Authorization_Token');
        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
            $Output = $this->SiswaModel->update($POST);
            if ($Output) {
                $this->response(true, REST_Controller::HTTP_OK);
            }else{
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
    public function Hapus_delete()
    {
        $this->load->library('Authorization_Token');
        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $Output = $this->SiswaModel->delete($this->uri->segment(3));
            if ($Output) {
                $this->response(true, REST_Controller::HTTP_OK);
            }else{
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
}