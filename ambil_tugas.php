<?php
include 'koneksi.php';

$query = "SELECT * FROM kegiatan ORDER BY created_at DESC";
$result = mysqli_query($koneksi, $query);

$tasks = [];
while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = $row;
}

echo json_encode($tasks);
?>