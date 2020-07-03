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
            $Data = [
                "Categories" => array()
            ];
            $result = $this->db->get('kategori');
            foreach ($result->result_array() as $key => $value) {
                $itemkategori = [
                    'idkategori' => $value['idkategori'],
                    'nama'=> $value['nama'],
                    'keterangan'=> $value['keterangan'],
                    'objek'=>array()
                ];
                $this->db->where('idkategori', $value['idkategori']);
                $resultObject = $this->db->get('objek');
                foreach ($resultObject->result_array() as $key1 => $value1) {
                    $itemObjek = [
                        'idobjek' => $value1['idobjek'],
                        'nama' => $value1['nama'],
                        'longitude' => $value1['longitude'],
                        'latitude' => $value1['latitude'],
                        'keterangan' => $value1['keterangan'],
                        'gambar' => '',
                        'komentar' => array()
                    ];
                    $this->db->where('idobjek', $value1['idobjek']);
                    $resultGambar = $this->db->get('gambar');
                    $itemObjek['gambar'] = $resultGambar->result_array();

                    $this->db->where('idobjek', $value1['idobjek']);
                    $resultkomentar = $this->db->get('komentar');
                    $itemObjek['komentar'] = $resultkomentar->result_array();
                    array_push($itemkategori['objek'], $itemObjek);
                }
                
            }
            array_push($Data['Categories'], $itemkategori);
            
            return $Data['Categories'];
        }
    }

    public function onlyKategori()
    {
        $result = $this->db->get('kategori');
        return $result->result_array();
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
