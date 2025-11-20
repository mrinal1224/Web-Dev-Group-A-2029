// flags
let modalFlag = false;

// Elements
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const modalTaskArea = document.querySelector('.textArea-cont')
const mainCont = document.querySelector('.main-cont')
const allPriorityColors = document.querySelectorAll('.priority-color')




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
modalCont.addEventListener('keydown' , function(e){
   
   if(e.key=='Shift'){
    let task = modalTaskArea.value
    // generate the ticket
    createTicket(task)
    modalCont.style.display = "none";
    modalFlag = false;

   }

   // we will do nothing
})

// function to create or generate the ticket

function createTicket(ticketTask){
  const ticketCont =   document.createElement('div')
  ticketCont.setAttribute('class' , 'ticket-cont')

 ticketCont.innerHTML= ` <div class="ticket-color"></div>
 <div class="ticket-id">1234567</div>
 <div class="task-area">${ticketTask}</div>
 <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i>
 </div>`



 mainCont.appendChild(ticketCont)

}


allPriorityColors.forEach(function(colorElem){
  colorElem.addEventListener('click' , function(){
    
     allPriorityColors.forEach(function(priorityColor){
        priorityColor.classList.remove("active")
     })

     colorElem.classList.add('active')
  })
})



