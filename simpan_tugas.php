<?php
include 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = $_POST['nama'];
    $jadwal = $_POST['jadwal']; // Format: YYYY-MM-DD HH:MM
    $deskripsi = $_POST['deskripsi'];

    $query = "INSERT INTO kegiatan (nama_kegiatan, jadwal, deskripsi) VALUES ('$nama', '$jadwal', '$deskripsi')";
    
    if (mysqli_query($koneksi, $query)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => mysqli_error($koneksi)]);
    }
}
?>