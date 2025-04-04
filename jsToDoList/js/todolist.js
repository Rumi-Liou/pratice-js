let editIndex = null;
let deleteIndex = null;

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskDate = document.getElementById("taskDate").value;
    if (taskName.trim() === "" || taskDate.trim() === "") return;

    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");

    taskItem.innerHTML = `
        <span class="task-text">${taskName} <br> <small>${taskDate}</small></span>
        <div class="actions">
            <button class="edit-btn" onclick="editTask(this)">✏️</button>
            <button class="delete-btn" onclick="showDeleteModal(this)">🗑</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
}

function updateTask() {
    const taskName = document.getElementById("editTaskName").value;
    const taskDate = document.getElementById("editTaskDate").value;
    
    if (taskName.trim() === "" || taskDate.trim() === "") return; // 防止空值

    // 根據 editIndex 更新任務
    const taskItem = document.querySelectorAll(".todoList li")[editIndex];
    taskItem.querySelector(".task-text").innerHTML = `${taskName} <br> <small>${taskDate}</small>`;
    
    closeModal('editModal'); // 關閉編輯視窗
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    editIndex = Array.from(taskItem.parentElement.children).indexOf(taskItem); // 找到當前任務的索引

    const taskText = taskItem.querySelector(".task-text").childNodes[0].textContent.trim();
    const taskDate = taskItem.querySelector("small").textContent.trim();

    document.getElementById("editTaskName").value = taskText;  // 設定編輯視窗的任務名稱
    document.getElementById("editTaskDate").value = taskDate;  // 設定編輯視窗的日期

    document.getElementById("editModal").classList.remove("disNone"); // 顯示編輯視窗
}


function showDeleteModal(button) {
    deleteIndex = Array.from(button.parentElement.parentElement.parentElement.children).indexOf(button.parentElement.parentElement);
    document.getElementById("deleteModal").classList.remove("disNone");
}

function confirmDelete() {
    if (deleteIndex !== null) {
        document.querySelectorAll(".todoList li")[deleteIndex].remove();
        closeModal('deleteModal');
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("disNone");
}
