<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class Pegawai extends \Restserver\Libraries\REST_Controller
{
    public function __construct($config = 'rest')
    {
        parent::__construct($config);
        $this->load->model('Pegawai_model');
    }

    public function Ambil_get()
    {
        $output = $this->Pegawai_model->select(null);
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
            $Output = $this->Pegawai_model->insert($POST);
            if ($Output) {
                $this->response($Output, REST_Controller::HTTP_OK);
            }else{
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
    public function ubah_put()
    {
        $this->load->library('Authorization_Token');
        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
            $Output = $this->Pegawai_model->update($POST);
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
            $Output = $this->Pegawai_model->delete($this->uri->segment(3));
            if ($Output) {
                $this->response(true, REST_Controller::HTTP_OK);
            }else{
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
}