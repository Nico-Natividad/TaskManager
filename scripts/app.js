
const API="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks"



function saveTask(){

    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const status = $("#selStatus").val();
    const date = $("#selDate").val();
    const budget = $("#numBudget").val();


    const taskToSave = new Task(title,desc,color,status,date,budget);
    console.log(taskToSave);

    $.ajax({
        type: "POST",
        url:API,
        data: JSON.stringify(taskToSave),
        contentType:"application/json",
        success: function(created){
            console.log(created);
            displayTask(created);
        },
        error: function(err){
            console.log(err);
        }
    })

    displayTask(taskToSave);

}

function loadTask(){
    $.ajax({

        type: "GET",
        url: API,
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err)
        }
    });
}

function displayTask(task){
    let display = `
        <div class ="task" id = "${task.id}"class="display-card" style="border-color: ${task.color};">
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
    </div>
</div>
    `;
    $(".list").append(display);
}
function init(){
    console. log("Hello world!")
    $("#btnSave").click(saveTask);
    $(".list").on("click","btn-delete",deleteTask)
    loadTask();
    

}






function deleteTask(){
    let  btn = $(this);
    let taskElement = btn.parent(".task");

    let id = taskElement.attr("id");
    console.log("the requesting id is :", id)

    $.ajax({

        type: "delete",
        url: API + "/"+ id,
        success: function (){
            taskElement.fadeOut(500, function(){
                $(this).remove();
            });
        },
        error: function (err){
            console.log("error");

        }
    })
}
function updateTask(){
    $.ajax({
        type:"PUT",
        url:"https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/task",
        data:JSON.stringify({
            title: "hello this is the put method",
            budget: 159}
        ),

        contentType:"applicaton/JSON",
        success:function (response){
            console.log(response);
        },
        error: function (err){
            console.log(err);
        }

    })

};

