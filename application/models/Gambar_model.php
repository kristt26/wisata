<?php

class Gambar_model extends CI_Model
{
    public function select($id)
    {
        if($id){
            $this->db->where('idobjek', $id);
            $result = $this->db->get('gambar');
            $item = $result->result_array();
            return $item[0];
        }else{
            $result = $this->db->get('gambar');
            return $result->result_array();
        }
    }
    public function insert($data)
    {
        $item = [
            'idobjek'=>$data['idobjek'],
            'file'=> $data['file'],
            'keterangan'=> $data['keterangan']
        ];
        $result = $this->db->insert('gambar', $item);
        $data['idgambar']= $this->db->insert_id();
        return $data;
    }
    public function update($data)
    {
        $item = [
            'idobjek'=>$data['idobjek'],
            'file'=> $data['file'],
            'keterangan'=> $data['keterangan']
        ];
        $this->db->trans_begin();
        $this->db->where('idgambar', $data['idgambar']);
        $this->db->update('gambar', $item);
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
        $this->db->where('idgambar', $siswa['idgambar']);
        $this->db->delete('gambar');
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
}
