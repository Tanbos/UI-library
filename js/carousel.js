"use strict";

const config1 = ["https://loremflickr.com/320/240?random=1", "https://loremflickr.com/320/240?random=2", "https://loremflickr.com/320/240?random=3", "https://loremflickr.com/320/240?random=4"];
Carousel("carousel1", config1);

function Carousel(id_carousel, array_config) {
  const widthImg=320;  //size image ( width)

  let n; // number of images
  n = document.getElementById("carousel_photo").children.length;

  let count = 0; //counter
  let shift;

  showSlide();

  document.getElementById("btn_prev").onclick = changeSlidePrev;
  document.getElementById("btn_next").onclick = changeSlideNext;

  function changeSlidePrev(event) {
    count++;
    showSlide();
  }

  function changeSlideNext(event) {
    count--;
    showSlide();
  }

  function controlLimitImg() {
    switch (+count) {
      case 0:
        document.getElementById("btn_prev").classList.add("hidden");
        break;
      case 1 - n:
        document.getElementById("btn_next").classList.add("hidden");
        break;
      default:
        document.getElementById("btn_next").classList.remove("hidden");
        document.getElementById("btn_prev").classList.remove("hidden");
    }
  }

  function showSlide() {
    shift = count * widthImg;
    controlLimitImg();
    document.getElementById("carousel_photo").style.marginLeft = shift + 'px';
  }
}