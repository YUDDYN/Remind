
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    fetch('ambil_tugas.php')
        .then(response => response.json())
        .then(data => {
            tasks = data.map(task => ({
                ...task,
                schedule: new Date(task.jadwal),
                createdAt: new Date(task.created_at)
            }));
            renderTasks();
        });
}

function addTask() {
    const taskName = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('dateInput').value;
    const taskTime = document.getElementById('timeInput').value;
    const taskDesc = document.getElementById('descInput').value;

    if (!taskName || !taskDate) {
        alert("Nama kegiatan dan tanggal harus diisi!");
        return;
    }

    const formData = new FormData();
    formData.append('nama', taskName);
    formData.append('jadwal', `${taskDate} ${taskTime}`);
    formData.append('deskripsi', taskDesc);

    fetch('simpan_tugas.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            clearInputs();
            loadTasks(); // Muat ulang data dari server
        } else {
            alert("Gagal menyimpan data");
        }
    });
}

function clearInputs() {
    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('descInput').value = '';
}

function deleteTask(id) {
    if (confirm("Yakin hapus?")) {
        fetch(`hapus_tugas.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    loadTasks(); // Muat ulang data dari server
                } else {
                    alert("Gagal menghapus data");
                }
            });
    }
}

function renderTasks() {
    const listElement = document.getElementById('taskList');
    const sortBy = document.getElementById('sortFilter').value;
    listElement.innerHTML = '';

    let sortedTasks = [...tasks];

    if (sortBy === 'newest') sortedTasks.sort((a, b) => b.createdAt - a.createdAt);
    if (sortBy === 'oldest') sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
    if (sortBy === 'nearest') sortedTasks.sort((a, b) => a.schedule - b.schedule);
    if (sortBy === 'farthest') sortedTasks.sort((a, b) => b.schedule - a.schedule);

    sortedTasks.forEach(task => {
        const li = document.createElement('li');

        const dateString = task.schedule.toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        const timeString = task.schedule.toLocaleTimeString('id-ID', {
            hour: '2-digit', minute: '2-digit'
        });

        li.innerHTML = `
            <h4>${task.nama_kegiatan}</h4>
            <p>${task.deskripsi}</p>
            <span class="date-tag">📅 ${dateString} - ${timeString}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}