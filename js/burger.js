"use strict";
let burg = document.getElementsByClassName("burger");
for (let i = 0; i < burg.length; i++) {  // if more than 1 burger
  burg[i].onclick = show;
}


/* show  nav-menu (visible or hidden and append button X (close)) */
function show(event) {
  let btnBurger = this.getElementsByTagName("button")[0];  // search button in "burger"
    let menu = this.parentElement.getElementsByClassName("nav-menu");
    menu[0].classList.toggle("visible");  // add or remove class "visible"
    if (menu[0].classList.contains("visible")) {
      btnBurger.innerHTML = '<i class="fas fa-window-close" style="color: white;"></i>';
}    else {
      btnBurger.innerHTML = `<i class="fas fa-bars fa-w-14 fa-2x"></i>`;
    }

 }