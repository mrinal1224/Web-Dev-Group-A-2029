// flags
let modalFlag = false;


// Elements
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");



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
