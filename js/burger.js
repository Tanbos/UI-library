
"use strict";
let burg = document.getElementsByClassName("burger");
burg[0].onclick = show;

/* show  nav-menu (visible or hidden and append button X (close)) */
function show() {
  console.log('show')
  let btnBurger = burg[0].getElementsByTagName("button");  // search button in "burger"
  if (btnBurger.length==0)
    {   burg[0].innerHTML=`<button class="close-burger-button">X</button>`;
console.log(burg[0].innerHTML);
        let menu = document.getElementsByClassName("nav-menu");
        menu[0].classList.add("visible");
    }
  else {
        burg[0].innerHTML=`<i class="fas fa-bars fa-w-14 fa-2x" style="color: white;"></i>`;
        let menu = document.getElementsByClassName("nav-menu");
        menu[0].classList.remove("visible");
  }
}