"use strict";

let window_modal = document.getElementsByClassName("modal");

/* add elements for modal window*/
for (let i = 0; i < window_modal.length; i++) {
  /* add button X for close modal window */
  window_modal[i].insertAdjacentHTML("afterbegin", `<button class="modal-close close-button">X</button>`);
  window_modal[i].classList.add("hidden");  // all modal window hidden

  /* add blackout background for modal window */
  let modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-bg-dark");
  modalBackground.classList.add("hidden");
  window_modal[i].before(modalBackground);
}

/* all buttons "modal close" must close (hidden) modal window */
let x = document.getElementsByClassName("modal-trigger");
for (let i = 0; i < x.length; i++) {
  const button = x[i];
  const dataTarget = x[i].dataset.target;
  const modalWindow = document.getElementById(dataTarget);
  button.onclick = () => {
    modalWindow.classList.remove("hidden");
    modalWindow.previousSibling.classList.remove("hidden");
    let btn_close = document.getElementsByClassName("modal-close");
    for (let i = 0; i < btn_close.length; i++) {
      btn_close[i].onclick = (e) => {
        e.target.parentElement.classList.add("hidden");
        e.target.parentElement.previousSibling.classList.add("hidden");
      }
    }
  }

}


  







