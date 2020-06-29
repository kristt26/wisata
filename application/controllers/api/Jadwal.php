<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class Jadwal extends \Restserver\Libraries\REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Jadwal_model', 'JadwalModel');
    }

    /**
     *  Add New User
     * @method : POST
     */
    public function jadwalall_get()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        $this->load->library('Authorization_Token');

        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $Output = $this->JadwalModel->getAllJadwal();
            if ($Output > 0 && !empty($Output)) {
                $message = [
                    'status' => true,
                    'data' => $Output,
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            } else {
                $message = [
                    'status' => false,
                    'message' => "Tidak Ada Data",
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }
        } else {
            $message = [
                'status' => false,
                'message' => "Sessiom Habis",
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }

    }

    public function jadwalMahasiswa_get()
    {
        header("Access-Control-Allow-Origin: *");

        $this->load->library('Authorization_Token');

        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $Output = $this->JadwalModel->getjadwalmahasiswa($is_valid_token['data']->id);
            if ($Output > 0 && !empty($Output)) {
               
                if ($Output['message'] == 'TemKrsm') {
                    $Datakirim = array(
                        'data' => $Output,
                    );
                    $message = [
                        'status' => true,
                        'data' => $Datakirim,
                        'set' => $Output['message']
                    ];
                    $this->response($message, REST_Controller::HTTP_OK);
                } else if ($Output['message'] == 'Jadwal') {
                    if ($Output['status'] == true) {
                        $Datakirim = array(
                            'data' => $Output['Jadwal']
                        );
                        $message = [
                            'status' => true,
                            'data' => $Datakirim,
                            'set' => $Output['message']
                        ];
                        $this->response($message, REST_Controller::HTTP_OK);
                    } else {
                        $message = [
                            'status' => false,
                            'message' => "Tidak Ada Data Segera Hubungi Bagian BAAK",
                        ];
                        $this->response($message, REST_Controller::HTTP_NOT_FOUND);
                    }

                } else if ($Output['message'] == 'Krms') {
                    $message = [
                        'status' => true,
                        'data' => $Output,
                        'set' => $Output['message']
                    ];
                    $this->response($message, REST_Controller::HTTP_OK);
                }

            } else {
                $message = [
                    'status' => false,
                    'message' => "Tidak Ada Data",
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }
        } else {
            $message = [
                'status' => false,
                'message' => "Sessiom Habis",
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }

    }

    

    public function pengajuanKRS_post()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $_POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $Output = $this->JadwalModel->pengajuanKRS_post($_POST);
        if ($Output > 0 && !empty($Output)) {
            $message = [
                'status' => true,
                'message' => "Pengajuan KRS Anda Berhasil",
            ];
            $this->response($message, REST_Controller::HTTP_OK);
        } else {
            $message = [
                'status' => false,
                'message' => "Pengajuan KRS Anda Gagal",
            ];
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        }
    }

    // /**
    //  *  Fetch All User Data
    //  * @method : GET
    //  */
    // public function fetch_all_users_get()
    // {
    //     header("Access-Control-Allow-Origin: *");
    //     $data = $this->User_model->fetch_all_users();
    //     $this->response($data);
    // }
}
