"use strict";

function Carousel(id_carousel, arrayImages) {
  let n = arrayImages.length; // n - number of images
  let widthImage; // widthImage - width image from arrayImages

  let img = new Image();
  img.src = arrayImages[0];
  img.onload = function () {
    widthImage = img.width;

    let carousel = document.getElementById(id_carousel);
    carousel.setAttribute("class", "carousel");
    let carouselSlider = document.createElement("div");
    carouselSlider.setAttribute("id", "carouselSlider");
    carouselSlider.style.width = widthImage + "px";
    carousel.appendChild(carouselSlider);
    let carouselPhotos = document.createElement("div");
    carouselPhotos.setAttribute("id", "carouselPhoto");
    carouselPhotos.style.width = widthImage * n + "px";
    carouselSlider.appendChild(carouselPhotos);

    for (let i = 0; i < n; i++) {
      let pic = document.createElement("IMG");
      pic.src = arrayImages[i];
      carouselPhotos.appendChild(pic);
    }

    addButtonsFlipping();

    let count = 0; // counter for shift
    let shift;
    showSlide();
    document.getElementById("btnPrev").onclick = changeSlidePrev;
    document.getElementById("btnNext").onclick = changeSlideNext;

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
          document.getElementById("btnPrev").classList.add("hidden");
          break;
        case 1 - n:
          document.getElementById("btnNext").classList.add("hidden");
          break;
        default:
          document.getElementById("btnNext").classList.remove("hidden");
          document.getElementById("btnPrev").classList.remove("hidden");
      }
    }

    function showSlide() {
      shift = count * widthImage;
      controlLimitImg();
      document.getElementById("carouselPhoto").style.marginLeft = shift + 'px';
    }

    function addButtonsFlipping() {
      carousel.insertAdjacentHTML("afterbegin", `<button class="btnSlider" id="btnPrev"><i class="fas fa-chevron-left"></i></button>`);
      carousel.insertAdjacentHTML("beforeend", `<button class="btnSlider" id="btnNext"><i class="fas fa-chevron-right"></i></button>`);
    }

  }
}