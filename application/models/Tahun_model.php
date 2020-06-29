<?php

class Tahun_model extends CI_Model
{
    public function select($idtahunajaran)
    {
        if($idtahunajaran){
            $this->db->where('idtahunajaran', $idtahunajaran);
            $result = $this->db->get('tahunajaran');
            $item = $result->result_object();
            foreach ($item as $key => $value) {
                $value->status = boolval($value->status);
            }
            return $item;
        }else{
            $result = $this->db->get('tahunajaran');
            $item = $result->result_object();
            foreach ($item as $key => $value) {
                $value->status = boolval($value->status);
            }
            return $item;
        }
    }
    public function insert($data)
    {
        if($data['status']){
            $this->db->trans_begin();
            $this->db->set('status', 0);
            $this->db->where('status', 1);
            $this->db->update('tahunajaran');
        }

        $item = [
            "tahunajaran" => $data['tahunajaran'],
            "semester" => $data['semester'],
            "status" => $data['status']? 1: 0,
        ];
        $this->db->insert('tahunajaran', $item);
        $item['idtahunajaran'] = $this->db->insert_id();
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return $item;
        }
    }
    public function update($data)
    {
        
        $item = [
            "tahunajaran" => $data['tahunajaran'],
            "semester" => $data['semester'],
            "status" => $data['status']? 1: 0 ,
        ];
        $this->db->trans_begin();
        $this->db->where('idtahunajaran', $data['idtahunajaran']);
        $this->db->update('tahunajaran', $item);
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
        $this->db->where('idtahunajaran', $id);
        $result = $this->db->delete('tahunajaran');
        return $result;
    }
}
