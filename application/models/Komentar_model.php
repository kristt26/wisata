<?php

class Komentar_model extends CI_Model
{
    public function select($id)
    {
        if($id){
            $this->db->where('idkomentar', $id);
            $result = $this->db->get('komentar');
            return $result->result_array();
        }else{
            $result = $this->db->get('komentar');
            return $result->result_array();
        }
    }
    public function insert($data)
    {
        $this->db->trans_begin();
        $item = [
            'nama'=>$data['nama'],
            'komentar'=>$data['komentar'],
            'idobjek'=>$data['idobjek']
        ];
        $this->db->insert('komentar', $item);
        $data['idkomentar'] = $this->db->insert_id();
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return $data;
        }
    }

    public function update($data)
    {
        $this->db->trans_begin();
        $item = [
            'nama'=>$data['nama'],
            'komentar'=>$data['komentar'],
            'idobjek'=>$data['idobjek']
        ];
        $this->db->where('idkomentar', $data['idkomentar']);
        $this->db->update('komentar', $item);
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
    public function delete($id)
    {
        $this->db->trans_start();
        $this->db->where('idkomentar', $id);
        $this->db->delete('komentar');
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
}
