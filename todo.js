let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDom(task) {
    const li = document.createElement('li');
    // console.log(task.text, "what is wrong")

    li.innerHTML = `
   
        <input type="checkbox" id="${task.id}"  ${task.done ? 'checked' : ''} data-id="${task.id}" class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <i class="delete fa-solid fa-trash" style="color:rgba(157, 34, 34, 0.962)" data-id="${task.id}" ></i>
        
    `;
    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    const wTask = tasks.filter(function(task){
        return task.id == taskId;
    })
    if(wTask.length>0){
        const currentTask = wTask[0];
        // console.log(wTask);
        currentTask.done = !currentTask.done;
        renderList();
        window.localStorage.setItem('datalist', JSON.stringify(tasks));
        // console.log(localStorage.getItem('datalist'))
        // showNotification('Task toggeled successufuly ');
        // let funone = JSON.parse(localStorage.getItem('datalist'))
        // console.log(funone);
        return;
    }
    showNotification('Cannot toggle this task ');
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id!==taskId
    })
    tasks = newTasks;
    window.localStorage.setItem('datalist',JSON.stringify(tasks));
    renderList();
    // showNotification('Task deleted Successfully ');

}

function handleDelete(task){
    deleteTask(task.toString());
    // console.log(task);
}

function addTask (task) {
    if(task){
        tasks.push(task);
        window.localStorage.setItem('datalist',JSON.stringify(tasks));
        renderList();
        // showNotification('Task added successufully');
        return;
    }
    showNotification('Task cannot be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e){

    if(e.key=='Enter'){
        const text = e.target.value;
        // console.log('text',text);
    
        if(!text){
            showNotification("Text cannot be empty")
            return
        }

        const task = {
            text,
            id:Date.now().toString(),
            done:false,
        }
        e.target.value = "";
        addTask(task);
    }
}

function handleClickEvents(e){
    const target = e.target;
    // console.log(target);

    if(target.className=="delete fa-solid fa-trash"){
        const did = target.getAttribute('data-id').toString();
        // console.log(did, 'is this working');
        deleteTask(did);
    }else if(target.className == 'custom-checkbox'){
        const did = target.id;
        toggleTask(did);
    }
}

function initializeApp(){
    // tasks = JSON.parse(localStorage.getItem('datalist'));
    // if(tasks !== null){
    //     renderList();
    // }
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickEvents);
    setInterval(() => {
        renderList();
    }, 3000);
    
}

initializeApp();