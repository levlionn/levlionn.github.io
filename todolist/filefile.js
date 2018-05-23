var data = {
  toDoList:[]
};

var buttonPlus = document.querySelector("#buttonPlus");
var buttonMinus = document.querySelector("#buttonMinus");
var clearCompleted = document.querySelector("#clearCompleted");

var input = document.querySelector("input");
var ul = document.querySelector("ul");

buttonPlus.addEventListener("click", function(){
    if (input.value.length === 0){
      return;
    }
    data.toDoList.push({
      text: input.value,
      completed: false
    });
    console.log(data.toDoList);
    input.value = "";
    input.focus(); //focused on input box
    render();
});

buttonMinus.addEventListener("click", function(){

  if(data.toDoList.length == 0){
    console.log("This array is empty.");
    return;
  }

  data.toDoList.pop();

  render();
});

clearCompleted.addEventListener("mouseover", function(){
  data.toDoList = data.toDoList.filter(function(item){
    if (item.completed == true){
      return false;
    }
  })
  data.toDoList = data.toDoList.filter(item => return false)
  render();
})

function render(){

  let newData = [];
  //step 1 : convert to HTML
  for(let i = 0; i < data.toDoList.length;i++){
    let li = document.createElement("li"); //creates element called "li"
    li.addEventListener("click", function(){ //upon clicking of a button crosses out item
      this.classList.toggle("completed");
      data.toDoList[i].completed = !data.toDoList[i].completed;

    });
    li.innerText = data.toDoList[i].text; //creates a string that is stored in "li"
    newData.push(li); //appends the "li" to the newData array

    //newData.push("<li>"+data.toDoList[i]+"</li>");
  }

  // step2 : render to DOM
  ul.innerHTML = ""; //clears input buffer of the DOM
  newData.forEach(li => ul.appendChild(li)); //for each item in the list, append it to the DOM list.


}
