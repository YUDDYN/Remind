<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
</head>

<body>
    <div class="container">
        <h2>📅 Daftar Kegiatan</h2>

        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Nama Kegiatan...">
            <input type="date" id="dateInput">
            <input type="time" id="timeInput">
            <textarea id="descInput" placeholder="Keterangan singkat..."></textarea>
            <button onclick="addTask()">Tambah Jadwal</button>
        </div>

        <hr>

        <div class="filter-section">
            <label>Urutkan berdasarkan:</label>
            <select id="sortFilter" onchange="renderTasks()">
                <option value="newest">Terbaru Dibuat</option>
                <option value="oldest">Terlama Dibuat</option>
                <option value="nearest">Jadwal Paling Dekat</option>
                <option value="farthest">Jadwal Paling Jauh</option>
            </select>
        </div>

        <ul id="taskList">
            <?php
            include 'koneksi.php';
            // Ambil data (Default: Terbaru)
            $sql = "SELECT * FROM kegiatan ORDER BY created_at DESC";
            $result = mysqli_query($koneksi, $sql);

            while ($row = mysqli_fetch_assoc($result)) {
                $date = date('d F Y', strtotime($row['jadwal']));
                $time = date('H:i', strtotime($row['jadwal']));
                echo "<li>
                <h4>{$row['nama_kegiatan']}</h4>
                <p>{$row['deskripsi']}</p>
                <span class='date-tag'>📅 $date - $time</span>
                <a href='hapus_tugas.php?id={$row['id']}' class='delete-btn' 
                   onclick='return confirm(\"Yakin hapus?\")'>Hapus</a>
              </li>";
            }
            ?>
        </ul>
    </div>



</body>

</html>