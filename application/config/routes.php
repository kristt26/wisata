<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


$route['API'] = 'Rest_server';

// User
$route['api/users']['post'] = 'Users/login';

// Kategogi
$route['api/kategori']['get'] = 'Kategori/Ambil';
$route['api/kategori/:num']['get'] = 'Kategori/AmbilKategori';
$route['api/kategori']['post'] = 'Kategori/Simpan';
$route['api/kategori']['put'] = 'Kategori/ubah';
$route['api/kategori/:num']['delete'] = 'Kategori/Hapus';

// Kategogi
$route['api/objek']['get'] = 'Objek/Ambil';
$route['api/objek']['post'] = 'Objek/Simpan';
$route['api/objek']['put'] = 'Objek/ubah';
$route['api/objek/:num']['delete'] = 'Objek/Hapus';

$route['api/komentar']['get'] = 'Komentar/Ambil';
$route['api/komentar']['post'] = 'Komentar/Simpan';
$route['api/komentar']['put'] = 'Komentar/ubah';
$route['api/komentar/:num']['delete'] = 'Komentar/Hapus';

$route['api/gambar']['get'] = 'Gambar/Ambil';
$route['api/gambar']['post'] = 'Gambar/Simpan';
$route['api/gambar']['put'] = 'Gambar/ubah';
$route['api/gambar/:num']['delete'] = 'Gambar/Hapus';

$route['api/pegawai']['get'] = 'Pegawai/Ambil';
$route['api/pegawai']['post'] = 'Pegawai/Simpan';
$route['api/pegawai']['put'] = 'Pegawai/ubah';
$route['api/pegawai/:num']['delete'] = 'SiPegawaiswa/Hapus';


// transaksi
$route['api/kelulusan']['get'] = 'Kelulusan/Ambil';
$route['api/kelulusan']['post'] = 'Kelulusan/simpan';


