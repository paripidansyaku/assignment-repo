"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
  let imageCount = imgFiles.length;
  let galleryBox = document.getElementById("lightbox");
  let currentSlide = 1;
  let runShow = true;
  let showRunning;

  let galleryTitle = document.createElement("h1");
  galleryTitle.id = "galleryTitle";
  let slidesTitle = lightboxTitle; // TODO figure out title
  galleryTitle.textContent = slidesTitle;
  galleryBox.appendChild(galleryTitle);

  let slideCounter = document.createElement("div");
  slideCounter.id = "slideCounter";
  slideCounter.textContent = currentSlide + "/" + imageCount;
  galleryBox.appendChild(slideCounter);

  let leftBox = document.createElement("div");
  leftBox.id = "leftBox";
  leftBox.innerHTML = "&#9664;";
  leftBox.onclick = moveToLeft;
  galleryBox.appendChild(leftBox);

  let rightBox = document.createElement("div");
  rightBox.id = "rightBox";
  rightBox.innerHTML = "&#9654;";
  rightBox.onclick = moveToRight;
  galleryBox.appendChild(rightBox);

  let playPause = document.createElement("div");
  playPause.id = "playPause";
  playPause.innerHTML = "&#9199;";
  playPause.onclick = startStopShow;
  galleryBox.appendChild(playPause);

  let slideBox = document.createElement("div");
  slideBox.id = "slideBox";
  galleryBox.appendChild(slideBox);

  for (let i = 0; i < imageCount; i++) {
    let image = document.createElement("img");
    image.src = imgFiles[i];
    image.alt = imgCaptions[i];
    image.onclick = createModal;
    slideBox.appendChild(image);
  }

  function moveToRight() {
    let firstImage = slideBox.firstElementChild.cloneNode("true");
    firstImage.onclick = createModal;
    slideBox.appendChild(firstImage);
    slideBox.removeChild(slideBox.firstElementChild);
    currentSlide++;
    if (currentSlide > imageCount) {
      currentSlide = 1;
    }
    slideCounter.textContent = currentSlide + " / " + imageCount;
  }

  function moveToLeft() {
    let lastImage = slideBox.lastElementChild.cloneNode("true");
    lastImage.onclick = createModal;
    slideBox.removeChild(slideBox.lastElementChild);
    slideBox.insertBefore(lastImage, slideBox.firstElementChild);
    currentSlide--;
    if (currentSlide === 0) {
      currentSlide = imageCount;
    }
    slideCounter.textContent = currentSlide + " / " + imageCount;
  }

  function startStopShow() {
    if (runShow) {
      showRunning = window.setInterval(moveToRight, 2000);
      runShow = false;
    } else {
      window.clearInterval(showRunning);
      runShow = true;
    }
  }

  function createModal() {
    let modalWindow = document.createElement("div");
    modalWindow.id = "lbOverlay";
    let figureBox = document.createElement("figure");
    modalWindow.appendChild(figureBox);

    /////// Assignment 2 code start ////////
    // Create the add to favorites button.
    const addBtn = document.createElement("button");
    addBtn.setAttribute("type", "button");
    addBtn.setAttribute("class", "handleBtn");
    addBtn.textContent = "Add to Favorites";

    // Add a click event to the button.
    // In this event, the remove function is also implemented.
    addBtn.addEventListener("click", (e) => {
      const favBox = document.getElementById("imageCollection");
      const cloneImg = e.target.previousElementSibling.firstChild.cloneNode(true);

      // Check if there's already 5 pics in the favorites.
      if (favBox.children.length >= 5) {
        window.alert(
          "You cannot add more than 5 images in your favorite images.\n" +
            "Please remove at least one picture from your favorite images"
        );
        return;
      }

      // Check if a picture is already in the favorites.
      const duplicationChkArray = Array.from(favBox.children).map((elem) => {
        return elem.firstChild.alt;
      });
      if (duplicationChkArray.includes(cloneImg.alt)) {
        window.alert(
          "You cannot add the same image in your favorite images.\n" +
            "Please close this window and select a different image."
        );
        return;
      }

      // Add a favorite pictures div
      const favImgDiv = document.createElement("div");
      favImgDiv.setAttribute("class", "favImg");

      // Add a click event to display remove buttons for the favorite pictures.
      cloneImg.addEventListener("click", (e) => {
        e.target.nextElementSibling.style.display = "flex";
      });
      favImgDiv.appendChild(cloneImg);

      // Create a remove button.
      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("type", "button");
      removeBtn.setAttribute("class", "handleBtn");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });
      favImgDiv.appendChild(removeBtn);

      favBox.appendChild(favImgDiv);
    });

    modalWindow.appendChild(addBtn);
    /////// Assignment 2 code end ////////

    let modalImage = this.cloneNode("true");
    figureBox.appendChild(modalImage);

    let figureCaption = document.createElement("figcaption");
    figureCaption.textContent = modalImage.alt;
    figureBox.appendChild(figureCaption);

    let closeBox = document.createElement("div");
    closeBox.id = "lbOverlayClose";
    closeBox.innerHTML = "&times;";
    closeBox.onclick = function () {
      document.body.removeChild(modalWindow);
    };

    modalWindow.appendChild(closeBox);

    document.body.appendChild(modalWindow);
  }
}
