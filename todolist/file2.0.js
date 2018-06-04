var data = {
  todoList: []
};

var buttonPlus = document.querySelector("#buttonPlus");
var buttonMinus = document.querySelector("#buttonMinus");
var clearCompletedButton = document.querySelector("#clearCompleted");
var input = document.querySelector("#todolist input");
var ul = document.querySelector("ul");
var selectAllButton = document.querySelector("#selectAll");
var filterCompletedbutton = document.querySelector("#filterCompletedbutton")

function replaceAll(source, text, replacement){
  //splitting up text into array chunks, joining back together with replacement.
  return source.split(text).join(replacement);
}

function sanitizeHTML(string){
   string = replaceAll(string, "<", "&lt;");
   string = replaceAll(string, ">", "&gt;");
   string = replaceAll(string, '"', "&quot;");
   string = replaceAll(string, "'", "&#039;");

   return string;
}

function addTodo(text){

  if (text.trim() === ""){
    return;
  }
  data.todoList.unshift({
    text: text.trim(),
    completed: false,
    id: Date.now().toString()//built in function to tell ID.
  });
}

function removeMostRecent(){
  data.todoList.pop(); //removes last index from array.
}

function toggleTodo(id){
  for (let i=0; i < data.todoList.length;i++){
    let todo = data.todoList[i];
    if (todo.id === id)
      todo.completed = !todo.completed;
  }
}

function selectAll(){
  for (let i=0; i < data.todoList.length;i++){
    data.todoList[i].completed = true;
  }
}

function clearCompleted(){
  for (let i=0; i < data.todoList.length;i++){
    let toodo = data.todoList[i];
    if (toodo.completed === true){
      data.todoList.splice(i,1);
      i--;
    }
  }
}

function filterNotCompleted(){
  for(let i=0;i<data.todoList.length;i++){
    let currentPosition = data.todoList[i];
    if(currentPosition.completed === false){
      data.todoList.splice(i,1);
      i--;
    }
  }
}

function save(){
  localStorage.todoList = JSON.stringify(data.todoList); //stores into browser.
}

function load(){
  if (localStorage.todoList){
    data.todoList = JSON.parse(localStorage.todoList);
  }
}

function render(){

  //sets to innerHTML, modifies each item in the array, joins them together.
  ul.innerHTML = data.todoList.map(function(item){
    let className = "";
    if(item.completed === true){
      className = "completed";
    }
    return `
    <li class="${className}"
      data-id="${item.id}">
      ${sanitizeHTML(item.text)}
    </li>
    `;
  }).join("");
}

/////////////////////////////// addEventListenerszz(biding ui elements to functions)

input.addEventListener("keydown",function(e){
  if (e.keyCode === 13){
    addTodo(input.value);
    input.value = "";
    render();
    save();
    input.focus();
  }

});

buttonPlus.addEventListener("click", function(){
  addTodo(input.value);
  input.value = "";
  render();
  save();
  input.focus();
});

buttonMinus.addEventListener("click", function(){
  removeMostRecent();
  render();
  save();
});

clearCompletedButton.addEventListener("click", function(){
  clearCompleted();
  render();
  save();
});

selectAllButton.addEventListener("click", function(){
  selectAll();
  render();
  save();
});

ul.addEventListener("click", function(e){
  let id = e.target.getAttribute("data-id");
  toggleTodo(id);
  render();
  save();
});

filterCompletedbutton.addEventListener("click", function(){
  filterNotCompleted();
  render();
  save();
});



document.addEventListener("DOMContentLoaded", function(){
  load();
  render();
});
