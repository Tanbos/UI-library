"use strict";

let window_modal = document.getElementsByClassName("modal");
let countModal = 0;  // counter for opened modal window
for (let i = 0; i < window_modal.length; i++) {
  /* add button X for close modal window */
  window_modal[i].insertAdjacentHTML("afterbegin", `<button class="modal-close close-button">X</button>`);
}

let zInd = document.body.childElementCount; //number all elements for z-index modal window

let x = document.getElementsByClassName("modal-trigger");

document.getElementById("modal-bg-dark").style.display = "none";
for (let i = 0; i < x.length; i++) {
  const button = x[i];
  const dataTarget = x[i].dataset.target;
  const modalWindow = document.getElementById(dataTarget);
  modalWindow.classList.add("hidden");
  button.onclick = (e) => {
    modalWindow.style.zIndex = zInd + 1 + "";
    zInd++;
    modalWindow.classList.remove("hidden");
    countModal++;
    document.getElementById("modal-bg-dark").style.display = "flex";
    document.getElementById("modal-bg-dark").style.zIndex = zInd - x.length + "";
  };
}

/* all button "modal close" must close (hidden) modal window */
let btn_close = document.getElementsByClassName("modal-close");
for (let i = 0; i < btn_close.length; i++) {
  btn_close[i].onclick = (e) => {
    e.target.parentElement.classList.add("hidden");
    countModal--;
    if (countModal === 0) document.getElementById("modal-bg-dark").style.display = "none";
  }
}


  







