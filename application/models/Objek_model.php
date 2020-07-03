<?php

class Objek_model extends CI_Model
{
    public function select($id)
    {
        if (!is_null($id)) {
            $this->db->where('idobjek', $id);
            $result = $this->db->get('objek');
            return $result->result_array();
        } else {
            $result = $this->db->query('
            SELECT
                `objek`.*,
                `kategori`.`nama` AS `namakategori`
            FROM
                `objek`
                LEFT JOIN `kategori` ON `kategori`.`idkategori` = `objek`.`idkategori`');
            return $result->result_array();
        }
    }
    public function selectAll()
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
        $this->db->trans_begin();
        $item = [
            'nama' => $data['nama'],
            'longitude' => $data['longitude'],
            'latitude' => $data['latitude'],
            'keterangan' => $data['keterangan'],
            'idkategori' => $data['idkategori'],
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
            'nama' => $data['nama'],
            'longitude' => $data['longitude'],
            'latitude' => $data['latitude'],
            'keterangan' => $data['keterangan'],
            'idkategori' => $data['idkategori'],
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
