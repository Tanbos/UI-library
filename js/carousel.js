"use strict";

function Carousel(id_carousel, arrayImages) {
  let n = arrayImages.length; // n - number of images
  let widthImage; // widthImage - width of image from arrayImages

  let img = new Image();
  img.src = arrayImages[0];
  img.onload = function () {
    widthImage = img.width;

    let carousel = document.getElementById(id_carousel);
    carousel.setAttribute("class", "carousel");
    carousel.style.width = widthImage + "px";

    let carouselSlider = document.createElement("div");
    carouselSlider.setAttribute("class", "carouselSlider");
    carouselSlider.style.width = widthImage + "px";
    carousel.appendChild(carouselSlider);

    let carouselPhotos = document.createElement("div");
    carouselPhotos.setAttribute("class", "carouselPhoto");
    carouselPhotos.style.width = widthImage * n + "px";
    carouselSlider.appendChild(carouselPhotos);

    let btnPrev = document.createElement("button");
    btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>'; // from fontawesome
    btnPrev.classList.add("btnSlider");
    btnPrev.classList.add("btnPrev");
    carouselSlider.before(btnPrev);

    let btnNext = document.createElement("button");
    btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>'; // from fontawesome
    btnNext.classList.add("btnSlider");
    btnNext.classList.add("btnNext");
    carouselSlider.after(btnNext);

    for (let i = 0; i < n; i++) {
      let pic = document.createElement("img");
      pic.src = arrayImages[i];
      carouselPhotos.appendChild(pic);
    }

    let count = 0; // counter for images
    let shift = 0; // shift block with images
    showSlide();

    btnPrev.onclick = function () {
      changeNumberImg(-1);
    };

    btnNext.onclick = function () {
      changeNumberImg(+1);
    };

    /* change counter for shift block with images (value: from 0 to n)*/
    function changeNumberImg(value) {
      count = count + value;
      showSlide();
    }

    /* when the first or last picture is displayed - hides the corresponding buttons */
    function controlLimitImg() {
      switch (+count) {
        case 0:
          btnPrev.classList.add("hidden");
          break;
        case n - 1:
          btnNext.classList.add("hidden");
          break;
        default:
          btnNext.classList.remove("hidden");
          btnPrev.classList.remove("hidden");
      }
    }

    /* moves the block with images */
    function showSlide() {
      shift = -count * widthImage;
      controlLimitImg();
      carouselPhotos.style.marginLeft = shift + 'px';
    }
  }
}