var data = {
  //initilizes an empty array.
  toDoList: []
};

var buttonPlus = document.querySelector("#buttonPlus");
var buttonMinus = document.querySelector("#buttonMinus");
var clearCompleted = document.querySelector("#clearCompleted");
var input = document.querySelector("input");
var ul = document.querySelector("ul");
var selectAll = document.querySelector("#selectAll");

//adds input into the toDoList array.
function addToToDoList(){

  //checks if the input is 0, returns nothing.(doesnt add to the list)
  if (input.value.length === 0){
    return;
  }

  //appends the data to the array as an object.
  data.toDoList.push({
    text: input.value,
    completed: false
  });

  //displays the data.
  console.log(data.toDoList);
  input.value = "";
  //focused on input box.
  input.focus();
  render();
};

function save(){
  localStorage.toDoList = JSON.stringify(data.toDoList);
}

function load(){
  if (localStorage.toDoList === undefined )
    return;
  else{
    data.toDoList = JSON.parse(localStorage.toDoList);
    render();
  }
}

input.addEventListener("keydown", function(e){
  if (e.keyCode === 13)
    addToToDoList();
});

buttonPlus.addEventListener("click", addToToDoList);

buttonMinus.addEventListener("click", function(){

  if(data.toDoList.length === 0){
    console.log("This array is empty.");
    return;
  }

  data.toDoList.pop();

  render();
});

clearCompleted.addEventListener("click", function(){

  data.toDoList = data.toDoList.filter(item => !item.completed);
  render();

})

//selects all items in the DOM and makes them opaque.
selectAll.addEventListener("click", function(){
  //make each item in array marked as opaque.
  for (let i=0; i < data.toDoList.length;i++){
    data.toDoList[i].completed = true;
  }
  render();
})

function render(){

  let newData = [];
  //step 1 : convert to HTML
  for(let i = 0; i < data.toDoList.length;i++){
    let li = document.createElement("li"); //creates element called "li"
    li.addEventListener("click", function(e){ //upon clicking of a button fades out item
      data.toDoList[i].completed = !data.toDoList[i].completed; //what does this do again? (toggle?)
      if (data.toDoList[i].completed){
        e.target.classList.add("completed");
      }else{
        e.target.classList.remove("completed");
      }

      save();
    });

    li.innerText = data.toDoList[i].text; //creates a string that is stored in "li"
    newData.push(li); //appends the "li" to the newData array

    //newData.push("<li>"+data.toDoList[i]+"</li>");

  }

  // step2 : render to DOM
 //clears input buffer of the DOM
  ul.innerHTML = "";
  newData.forEach(li => ul.appendChild(li)); //for each item in the list, append it to the DOM list.

  save();
}

load();
//endofFile
