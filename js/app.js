//select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//   add variable
let LIST, id;

//   get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; //set the id to the last one in the list
  loadList(LIST); //load the list to the user interface
} else {
  // if data isn't empty (new user to interface)
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the localstorage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload(); //reload the page
});
// show todays date

const today = new Date();
dateElement.innerHTML = today.toDateString();

// add function todo

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
    <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
  `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key

document.addEventListener("keyup", function (even) {
  if (even.keyCode === 13) {
    const toDo = input.value;

    // jika selepas insert text dlm input..text akan lenyap slps type input
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add item to localstorage (THIS CODE MUST BE ADDED WHERE THE LIST ARRAY IS UPDATED)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }

    input.value = "";
  }
});

// complete to do

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove toDo
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; //return the clicked element inside the list
  const elementJob = element.attributes.job.value; //complete or delete the element

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }
  // add item to localstorage (THIS CODE MUST BE ADDED WHERE THE LIST ARRAY IS UPDATED)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
