let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('dateInput').value;
    const taskTime = document.getElementById('timeInput').value;
    const taskDesc = document.getElementById('descInput').value;

    if (!taskName || !taskDate) {
        alert("Nama kegiatan dan tanggal harus diisi!");
        return;
    }

    // Gabungkan tanggal dan waktu agar bisa di-sort dengan akurat
    const fullSchedule = new Date(`${taskDate}T${taskTime}`);

    const newTask = {
        id: Date.now(),
        name: taskName,
        schedule: fullSchedule, // Menggunakan satu objek Date untuk tanggal & waktu
        desc: taskDesc,
        createdAt: new Date()
    };

    tasks.push(newTask);
    clearInputs();
    renderTasks();
}

function clearInputs() {
    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('descInput').value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const listElement = document.getElementById('taskList');
    const sortBy = document.getElementById('sortFilter').value;
    listElement.innerHTML = '';

    let sortedTasks = [...tasks];
    
    // Logika Pengurutan yang diperbaiki
    if (sortBy === 'newest') sortedTasks.sort((a, b) => b.createdAt - a.createdAt);
    if (sortBy === 'oldest') sortedTasks.sort((a, b) => a.createdAt - b.createdAt);
    if (sortBy === 'nearest') sortedTasks.sort((a, b) => a.schedule - b.schedule);
    if (sortBy === 'farthest') sortedTasks.sort((a, b) => b.schedule - a.schedule);

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        
        // Format tampilan tanggal dan waktu yang lebih manusiawi
        const dateString = task.schedule.toLocaleDateString('id-ID', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
        const timeString = task.schedule.toLocaleTimeString('id-ID', { 
            hour: '2-digit', minute: '2-digit' 
        });

        li.innerHTML = `
            <h4>${task.name}</h4>
            <span class="date-tag">📅 ${dateString} - ${timeString}</span>
       
            <button class="delete-btn" onclick="deleteTask(${task.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}