<?php

class Objek_model extends CI_Model
{
    public function select($id)
    {
        if($id){
            $this->db->where('idobjek', $id);
            $result = $this->db->get('objek');
            return $result->result_array();
        }else{
            $result = $this->db->get('objek');
            return $result->result_array();
        }
    }
    public function insert($data)
    {
        $this->db->trans_begin();
        $item = [
            'nama'=>$data['nama'],
            'longitude'=>$data['longitude'],
            'latitude'=>$data['latitude'],
            'keterangan'=>$data['keterangan'],
            'idkategori'=>$data['idkategori']
        ];
        $this->db->insert('objek', $item);
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
            'longitude'=>$data['longitude'],
            'latitude'=>$data['latitude'],
            'keterangan'=>$data['keterangan'],
            'idkategori'=>$data['idkategori']
        ];
        $this->db->where('idobjek', $data['idobjek']);
        $this->db->update('objek', $item);
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
        $this->db->where('idobjek', $id);
        $this->db->delete('objek');
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
    }
}
