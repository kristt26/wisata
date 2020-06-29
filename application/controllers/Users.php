<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class Users extends \Restserver\Libraries\REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_model', 'UserModel');
    }

    /**
     *  Add New User
     * @method : POST
     */
    public function register_post()
    {
        header("Access-Control-Allow-Origin: *");
        $_POST = $this->security->xss_clean($_POST);
        $this->form_validation->set_rules('Username', 'Username', 'trim|required|is_unique[users.Username]|alpha_numeric|max_length[20]',
            array('is_unique' => 'Username Sudah dipakai')
        );
        $this->form_validation->set_rules('Email', 'Email', 'trim|required|valid_email|max_length[80]|is_unique[users.Email]',
            array('is_unique' => 'Email Sudah dipakai')
        );
        $this->form_validation->set_rules('Password', 'trim|required|max_length[100]');
        $this->form_validation->set_rules('FullName', 'FullName', 'trim|required|max_length[50]');
        if ($this->form_validation->run() == false) {
            $message = array(
                'status' => false,
                'error' => $this->form_validation->error_array(),
                'message' => validation_errors(),
            );
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        } else {
            $InsertData = [
                'Username' => $this->input->post('Username', true),
                'FullName' => $this->input->post('FullName', true),
                'Email' => $this->input->post('Email', true),
                'Password' => md5($this->input->post('Password', true)),
                'Insert' => time(),
                'Update' => time(),
            ];
            $Output = $this->UserModel->insert_user($InsertData);
            if ($Output > 0 && !empty($Output)) {
                $message = [
                    'status' => true,
                    'message' => "Registrasi Berhasil",
                ];
                $this->response($message, REST_Controller::HTTP_OK);
            } else {
                $message = [
                    'status' => false,
                    'message' => "Registrasi Gagal",
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }

            // var_dump($Output);
        }

    }

    

    public function login_post()
    {
        // header("Access-Control-Allow-Origin: *");
        
        // $_POST = $this->security->xss_clean($_POST);
        $_POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $this->form_validation->set_rules('Username', 'Username', 'trim|required');
        $this->form_validation->set_rules('Password', 'trim|required|max_length[100]');
        if ($this->form_validation->run() == false) {
            $message = array(
                'status' => false,
                'error' => $this->form_validation->error_array(),
                'message' => validation_errors(),
            );
            $this->response($message, REST_Controller::HTTP_NOT_FOUND);
        } else {
            $Output = $this->UserModel->user_login($this->input->post('Username'), $this->input->post('Password'));
            if (!empty($Output && $Output != false)) {
                $this->load->library('Authorization_Token');

                $token_data['id'] = $Output->iduser;
                $token_data['Username'] = $Output->username;
                $token_data['Nama'] = $Output->nama;
                $token_data['Role'] = $Output->rolename;
                $token_data['time'] = time();


                $UserToken = $this->authorization_token->generateToken($token_data);
                // print_r($this->authorization_token->userData());
                // exit;

                $return_data = [
                    'iduser' => $Output->iduser,
                    'username' => $Output->username,
                    'nama' => $Output->nama,
                    'role' => $Output->rolename,
                    'status' => $Output->status,
                    'Token' => $UserToken,
                    'biodata' => $Output->biodata
                ];

                // $message = [
                //     'status' => true,
                //     'data' => $return_data,
                //     'message' => "Login Berhasil",
                // ];
                $this->response((object)$return_data, REST_Controller::HTTP_OK);
            } else {
                $message = [
                    'status' => false,
                    'message' => "Periksa Username dan Password",
                ];
                $this->response($message, REST_Controller::HTTP_NOT_FOUND);
            }
        }
    }
}
