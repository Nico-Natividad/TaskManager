const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    
    const taskToSave = new Task(title, desc, color, date, status, budget);
    console.log(taskToSave);
    
    $.ajax({
        type: "POST",
        url: API,
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(created) {
            console.log(created);
            displayTask(created);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function loadTask() {
    $.ajax({
        type: "GET",
        url: API,
        success: function(data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                displayTask(data[i]);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function displayTask(task) {
    let id = task._id || task.id;
    let display = `
        <div class="task display-card" id="${id}" style="border-color: ${task.color};">
            <div class="display-content">
                <h1 class="task-title">${task.title}</h1>
                <div class="task-desc">
                    <p>${task.desc}</p>
                </div>
                <div class="task-meta">
                    <span class="status-badge">${task.status}</span>
                    <div class="date-budget">
                        <span class="date">${task.date}</span>
                        <span class="budget">${task.budget}</span>
                    </div>
                </div>
                <button class="btn-delete">Delete</button>
            </div>
        </div>
    `;
    $(".list").append(display);
}

function deleteTask() {
    let btn = $(this);
    let taskElement = btn.closest(".task");
    let id = taskElement.attr("id");
    console.log("the requesting id is :", id);
    
    $.ajax({
        type: "DELETE",
        url: API + "/" + id,
        success: function () {
            taskElement.fadeOut(500, function() {
                $(this).remove();
            });
        },
        error: function (err) {
            console.log("error");
        }
    });
}

function updateTask() {
    $.ajax({
        type: "PUT",
        url: API,
        data: JSON.stringify({
            title: "hello this is the put method",
            budget: 159
        }),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function init() {
    console.log("Hello world!");
    $("#btnSave").click(saveTask);
    $(".list").on("click", ".btn-delete", deleteTask);
    loadTask();
}

window.onload = init;