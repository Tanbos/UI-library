
"use strict";

let x = document.getElementsByClassName("burger");

x[0].onclick = show;

function show() {
    let z = document.getElementsByTagName("button");

    if (z.length==0)
    {   x[0].innerHTML=`<button class="modal-close close-button">X</button>`;
        let menu = document.getElementsByClassName("nav-menu");
        menu[0].classList.add("visible");
    }
    else {
        x[0].innerHTML=`<div class="burger"><i class="fas fa-bars fa-w-14 fa-2x"></i></div>`;
        let menu = document.getElementsByClassName("nav-menu");
        menu[0].classList.remove("visible");
    }
}