<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class Kategori extends \Restserver\Libraries\REST_Controller
{
    public function __construct($config = 'rest')
    {
        parent::__construct($config);
        $this->load->model('Kategori_model');
    }

    public function Ambil_get()
    {
        $output = $this->Kategori_model->select(null);
        if($output){
            $this->response($output, REST_Controller::HTTP_OK);
        }
        
    }
    public function AmbilKategori_get()
    {
        $output = $this->Kategori_model->onlyKategori();
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
            $Output = $this->Kategori_model->insert($POST);
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
            $Output = $this->Kategori_model->update($POST);
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
            $a = $this->uri->segment(3);
            $Output = $this->Kategori_model->delete($a);
            if ($Output) {
                $this->response(true, REST_Controller::HTTP_OK);
            }else{
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
}