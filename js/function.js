window.onload = attachClickEvent;
document.addEventListener("DOMContentLoaded", getSavedTodoList);

//this function attachs the delete element function and check element function to the to do list dynamically
function attachClickEvent() {
    // get all the elements with class name "close"(array)
    var closeList = document.getElementsByClassName('close');
    var i;
    for (i = 0; i < closeList.length; i++) {
        closeList[i].addEventListener("click", deleteElement);
    }

    //get all elements with class name "complete"(array)
    var completeList = document.getElementsByClassName('complete');
    for (i = 0; i < completeList.length; i++) {
        completeList[i].addEventListener("click", checkElement);
    }
}


//this function adds a new todo task and saves it locally
function newTodo() {
    //todo text
    var li = document.createElement("li");
    var todoSpan = document.createElement("span");
    var inputValue = document.getElementById("Input").value;
    var todoText = document.createTextNode(inputValue);
    todoSpan.className = "task";
    if (inputValue === "") {
        alert("Please enter text!");
        return;
    }
    todoSpan.appendChild(todoText);
    li.appendChild(todoSpan);

    //close button
    var closeButton = document.createElement("span");
    closeButton.innerHTML = "\u00D7";   //unicode for X
    closeButton.className = "close";
    closeButton.addEventListener("click", deleteElement);
    li.appendChild(closeButton);

    //complete button
    var completeButton = document.createElement("span");
    completeButton.innerHTML = "\u2713";    //unicode for tick mark
    completeButton.className = "complete";
    completeButton.addEventListener("click", checkElement);
    li.appendChild(completeButton);

    document.getElementById("myTodoList").appendChild(li);
    document.getElementById("Input").value = "";
    
    // save added Todo Locally
    window.localStorage.setItem(inputValue, li.innerHTML);
}


// 
function deleteElement() {
    var li = this.parentElement;    //parent of close button is li
    li.style.display = "none";

    // delete locally saved todo
    var todoText = li.firstElementChild.innerHTML;  //first element is task span
    window.localStorage.removeItem(todoText);
}

function checkElement() {
    var li = this.parentElement;
    li.firstElementChild.classList.toggle("checked");

    //save todo locally
    var todoText = li.firstElementChild.innerHTML;
    window.localStorage.setItem(todoText, li.innerHTML);
    // console.log("element update"+window.localStorage.getItem(todoText));
}

function getSavedTodoList() {
    // localStorage.clear();
    var len = localStorage.length;
    for (var i = 0; i < len; i++) {
        var text = localStorage.getItem(localStorage.key(i));   //this is inner html of li
        var li = document.createElement("li");
        li.innerHTML = text;
        document.getElementById("myTodoList").appendChild(li);
    }
}