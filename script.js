const submit = document.querySelector(".add");
const input = document.querySelector(".input");
const tasksDiv = document.querySelector(".tasks");
const delBtn = document.querySelector(".del");
const clearAll = document.querySelector(".clear");
// ------------------------------------------------Add To ArrayOfTasks-------------------------------------
arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();
//----------------------------------------AddEventListener---------------------------------------------

submit.addEventListener("click", (e) => {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
    addDataToLocalStorageFrom(arrayOfTasks);
  }
});

tasksDiv.addEventListener("click", (e) => {
  // -------------------------------------------------------------------------------
  deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
  }
  // -------------------------------------------------------------------------------
  if(e.target.classList.contains("task")){
    toggleStatusTaskWith(e.target.getAttribute("data-id"))
    e.target.classList.toggle("done")
  }
});

clearAll.addEventListener("click", (e) => {

 tasksDiv.innerHTML = "";
 arrayOfTasks = []
 window.localStorage.removeItem("tasks")

})



// -----------------------------------------Functions----------------------------------------------

function addTasksToArray(x) {
  const task = { id: Date.now(), title: x, completed: false };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
}

function addElementsToPageFrom(x) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  x.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(x) {
  window.localStorage.setItem("tasks", JSON.stringify(x));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
  }
}

function deleteTaskWith(x){

  arrayOfTasks = arrayOfTasks.filter((task) => task.id != x )
  addDataToLocalStorageFrom(arrayOfTasks)
};
function toggleStatusTaskWith(x){
  for(let i = 0 ; i <  arrayOfTasks.length; i++){
    if(arrayOfTasks[i].id == x ){
      arrayOfTasks[i].completed == false ?  (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks)

}
// ------------------------------------------------------------------------------------------
