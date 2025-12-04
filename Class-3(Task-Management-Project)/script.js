// flags
let modalFlag = false;

// Elements
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const modalTaskArea = document.querySelector(".textArea-cont");
const mainCont = document.querySelector(".main-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
const dueDatePicker = document.querySelector("#dueDate");

console.log(dueDatePicker);

const ticketsFromLS = JSON.parse(localStorage.getItem("myTickets")) || [];

const ticketsArr = ticketsFromLS;

function init() {
  ticketsFromLS.forEach(function (ticket) {
    createTicket(
      ticket.ticketTask,
      ticket.ticketId,
      ticket.tickectColor,
      ticket.dueDateValue
    );
  });
}
init(); // this function will retrive tickets

let colorsArray = ["lightpink", "lightgreen", "lightblue", "black"];

let closeLock = "fa-lock";
let openLock = "fa-lock-open";

let ticketColorSelected = "lightpink";

// this section opens and closes the modal
addBtn.addEventListener("click", function () {
  if (modalFlag == false) {
    modalCont.style.display = "flex";
    modalFlag = true;
  } else {
    modalCont.style.display = "none";
    modalFlag = false;
  }
});

// Add the Task and createTicket
modalCont.addEventListener("keydown", function (e) {
  if (e.key == "Shift") {
    let task = modalTaskArea.value;
    let id = shortid();
    let color = ticketColorSelected;
    let dueDateValue = dueDatePicker.value;
    console.log(dueDateValue);
   const formattedDate =  formatDate(dueDateValue)
    // generate the ticket
    createTicket(task, id, color, formattedDate);
    modalCont.style.display = "none";
    modalFlag = false;
    modalTaskArea.value = "";

    ticketsArr.push({
      ticketTask: task,
      ticketId: id,
      tickectColor: color,
      ticketDueDate: dueDateValue,
    });

    localStorage.setItem("myTickets", JSON.stringify(ticketsArr));
  }

  // we will do nothing
});

// function to create or generate the ticket

function createTicket(ticketTask, ticketId, ticketColor, dueDate) {
  const ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");

  ticketCont.innerHTML = ` 
  <div style="background-color:${ticketColor};" class="ticket-color"></div>
 <div class="ticket-id">${ticketId}</div>
 <div class="task-area">${ticketTask}</div>
 <div>${dueDate}</div>
 <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
 </div>`;

  mainCont.appendChild(ticketCont);

  handleLock(ticketCont);
  // handleLock

  // handleColor
  handleColor(ticketCont);
}

allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener("click", function () {
    allPriorityColors.forEach(function (priorityColor) {
      priorityColor.classList.remove("active");
    });

    colorElem.classList.add("active");
    const color = colorElem.classList[0];
    ticketColorSelected = color;
  });
});

// handle the lock

function handleLock(ticket) {
  const ticketLockConatainer = ticket.querySelector(".ticket-lock");
  const ticketTaskArea = ticket.querySelector(".task-area");

  const ticketLock = ticketLockConatainer.children[0];

  ticketLock.addEventListener("click", function () {
    if (ticketLock.classList.contains(closeLock)) {
      ticketLock.classList.remove(closeLock);
      ticketLock.classList.add(openLock);
      ticketTaskArea.setAttribute("contenteditable", "true");
    } else {
      ticketLock.classList.remove(openLock);
      ticketLock.classList.add(closeLock);
      ticketTaskArea.setAttribute("contenteditable", "false");
    }
  });
}

// handle the color

function handleColor(ticket) {
  const ticketColorBand = ticket.querySelector(".ticket-color");
  ticketColorBand.addEventListener("click", function () {
    let currentColor = ticketColorBand.style.backgroundColor;
    // lightgreen
    let currentColorIdx = colorsArray.findIndex(function (color) {
      //lightgreen
      return color == currentColor; // lightgreen
    });

    console.log(currentColorIdx);
    const nextColorIdx = (currentColorIdx + 1) % colorsArray.length;
    const nextColor = colorsArray[nextColorIdx];

    ticketColorBand.style.backgroundColor = nextColor;
  });
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "oct",
  "Nov",
  "Dec",
];

function formatDate(duedate) {
  const t = new Date(duedate);
    const year = t.getFullYear();
  const monthIndex = t.getMonth();
  const month = months[monthIndex];
  console.log(month);
  const date = t.getDate();
  return `${date}/${month}/${year}`;
}
