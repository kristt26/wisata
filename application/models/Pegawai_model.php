<?php

class Pegawai_model extends CI_Model
{
    public function select($idpegawai)
    {
        if($idpegawai){
            $this->db->where('idpegawai', $idpegawai);
            $result = $this->db->get('pegawai');
            return $result->result_array();
        }else{
            $result = $this->db->get('pegawai');
            return $result->result_array();
        }
    }
    public function insert($data)
    {
        $this->db->trans_begin();
        $pass = md5($data['nis']);
        $user = $data['nis'];
        $this->db->query("INSERT INTO user values('','$user', '$pass','true')");
        $iduser = $this->db->insert_id();
        $item = [
            "nis" => $data['nis'],
            "nama" => $data['nama'],
            "jeniskelamin" => $data['jeniskelamin'],
            "jabatan" => $data['jabatan'],
            "alamat" => $data['alamat'],
            "kontak" => $data['kontak'],
            "pendidikan" => $data['pendidikan'],
            "iduser" => $iduser,
        ];
        $this->db->query("INSERT INTO userinrole values('','$iduser', '1')");
        $this->db->insert('pegawai', $item);
        $item['idpegawai'] = $this->db->insert_id();
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
            "nip" => $data['nip'],
            "nama" => $data['nama'],
            "jeniskelamin" => $data['jeniskelamin'],
            "jabatan" => $data['jabatan'],
            "alamat" => $data['alamat'],
            "kontak" => $data['kontak'],
            "pendidikan" => $data['pendidikan'],
            "iduser" => $data['iduser'],
        ];
        $this->db->trans_begin();
        $this->db->where('idpegawai', $data['idpegawai']);
        $this->db->update('pegawai', $item);
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
        $a = $this->select($id);
        $siswa = $a[0];
        $this->db->where('iduser', $siswa['iduser']);
        $this->db->delete('userinrole');
        $this->db->where('idpegawai', $id);
        $this->db->delete('pegawai');
        $this->db->where('iduser', $siswa['iduser']);
        $this->db->delete('user');
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            return false;
        } else {
            $this->db->trans_commit();
            return true;
        }
        $this->db->where('idpegawai', $id);
        $result = $this->db->delete('pegawai');
        return $result;
    }
}
