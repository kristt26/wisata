<?php

class Kategori_model extends CI_Model
{
    public function select($id)
    {
        if($id){
            $this->db->where('idkategori', $id);
            $result = $this->db->get('kategori');
            return $result->result_array();
        }else{
            $result = $this->db->get('kategori');
            return $result->result_array();
        }
    }
    public function insert($data)
    {
        $this->db->trans_begin();
        $item = [
            'nama'=>$data['nama'],
            'keterangan'=>$data['keterangan']
        ];
        $this->db->insert('kategori', $item);
        $id = $this->db->insert_id();
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return $id;
        }
    }

    public function update($data)
    {
        $this->db->trans_begin();
        $item = [
            'nama'=>$data['nama'],
            'keterangan'=>$data['keterangan']
        ];
        $this->db->where('idkategori', $data['idkategori']);
        $this->db->update('kategori', $item);
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
        $this->db->where('idkategori', $id);
        $this->db->delete('kategori');
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
}
