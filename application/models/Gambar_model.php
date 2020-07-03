<?php

class Gambar_model extends CI_Model
{
    public function select()
    {
        $resultObject = $this->db->get('objek');
        $Data['objek'] = array();
        foreach ($resultObject->result_array() as $key1 => $value1) {
            $itemObjek = [
                'idobjek' => $value1['idobjek'],
                'nama' => $value1['nama'],
                'longitude' => $value1['longitude'],
                'latitude' => $value1['latitude'],
                'keterangan' => $value1['keterangan'],
                'gambar' => '',
                'komentar' => array(),
            ];
            $this->db->where('idobjek', $value1['idobjek']);
            $resultGambar = $this->db->get('gambar');
            $itemObjek['gambar'] = $resultGambar->result_array();

            $this->db->where('idobjek', $value1['idobjek']);
            $resultkomentar = $this->db->get('komentar');
            $itemObjek['komentar'] = $resultkomentar->result_array();
            array_push($Data['objek'], $itemObjek);
        }
        return $Data['objek'];
    }
    public function insert($data)
    {
        $item = [
            'idobjek'=>$data['idobjek'],
            'file'=> $data['Berkas'],
            'keterangan'=> $data['keterangan']
        ];
        $result = $this->db->insert('gambar', $item);
        $item['idgambar']= $this->db->insert_id();
        return $item;
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
