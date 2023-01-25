const animation = document.getElementById("animation");
const wrapper = document.getElementById("wrapper");
const wrapperChar = document.querySelector(".wrapper-character");
const tetrisImg = document.getElementById("tetrisImg-Tetris");
const closesModalWindow = document.querySelectorAll(".close");
const btnsPrev = document.querySelectorAll(".btn-prev");
const btnsNext = document.querySelectorAll(".btn-next");
const imgLampTetris = document.getElementById("imgLamp-Tetris");
const imgLamp1 = document.getElementById("imgLamp-1");
const tetrisBlock = document.getElementById("tetrisBlock");
const modalBlock = document.querySelector(".modal");
const slides = document.querySelectorAll(".modalImgTetris");
const parentSlide = document.querySelector(".slides");
const gifTetris = document.getElementById("gifTetris");
const titlesPicture = document.querySelectorAll(".title-picture");
const exitLeft = document.querySelector(".exit-left");
const exitRight = document.querySelector(".exit-right");
const wrapperOuter = document.getElementById("outer-wrapper");
const bricks = document.querySelector(".bricks");

let counterX = 0;

function randomPositionBrick() {
  const brick = document.createElement("span");
  brick.classList.add("brick");

  const bricksArrSrc = ["../img/brick2.png", "../img/brick1.png"];
  let randomNum = Math.round(Math.random());
  brick.style.background = `url(${bricksArrSrc[randomNum]}) no-repeat`;

  let randomPositionTop = Math.round(Math.random() * 89);
  let randomPositionLeft = Math.round(Math.random() * 99);
  brick.style.top = randomPositionTop + "%";
  brick.style.left = randomPositionLeft + "%";

  bricks.appendChild(brick);
}
function randomPositionBricks() {
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
  randomPositionBrick();
}
randomPositionBricks();

const step = 0.2;
let prevX = 0;

wrapperOuter.addEventListener("scroll", () => {
  console.log(wrapper.getBoundingClientRect().x);

  nextX = wrapper.getBoundingClientRect().x;

  if (nextX < prevX) walkRight();
  else walkLeft();

  prevX = wrapper.getBoundingClientRect().x;
});

function walkRight() {
  animation.style.backgroundPosition = "-440px -359px";
  counterX += step;
  wrapperChar.style.left = counterX + "%";
  animation.classList.add("animation");
  animation.style.animationName = "walkRight";
  changeImgToColor(58, 64, imgLampTetris, tetrisImg);
}

function walkLeft() {
  counterX -= step;
  wrapperChar.style.left = counterX + "%";
  animation.style.animationName = "walkLeft";
  changeImgToColor(58, 64, imgLampTetris, tetrisImg);
}

function logScroll(source) {
  console.log("\n--- " + source + " ---");

  console.log("window.pageXOffset: " + window.pageXOffset);
  console.log("window.pageYOffset: " + window.pageYOffset);

  console.log("window.scrollX: " + window.scrollX);
  console.log("window.scrollY: " + window.scrollY);

  console.log("document.body.scrollTop: " + document.body.scrollTop);
  console.log("document.body.scrollLeft: " + document.body.scrollLeft);

  console.log(
    "document.documentElement.scrollTop: " + document.documentElement.scrollTop
  );
  console.log(
    "document.documentElement.scrollLeft: " +
      document.documentElement.scrollLeft
  );

  console.log("wrapper.offsetTop: " + wrapper.offsetTop);
  console.log("wrapper.offsetLeft: " + wrapper.offsetLeft);
  console.log("wrapper.scrollTop: " + wrapper.scrollTop);
  console.log("wrapper.scrollLeft: " + wrapper.scrollLeft);

  console.log("wrapper rect: ");
  console.log(wrapper.getBoundingClientRect());

  console.log("wrapper outer rect: ");
  console.log(wrapperOuter.getBoundingClientRect());
  /*
   console.log("slideOne rect: ");
   console.log(slideOne.getBoundingClientRect());

    console.log("scrollOffset(): ");
    console.log(scrollOffset());

    console.log("startY: " + startY);
    console.log("startX: " + startX);
    console.log("endY: " + endY);
    console.log("endX: " + endX);
    console.log("touch diff Y: " + (endY - startY));
    console.log("touch diff X: " + (endX - startX));
    */
}

function changeImgToColor(min, max, lamp, img) {
  if (counterX > min && counterX < max) {
    lamp.src = "img/onlight.png";
    lamp.classList.add("lampOn");
    img.src = "img/frameCol.png";
    gifTetris.style.display = "block";
    gifTetris.style.pointerEvents = "none";

    img.addEventListener("click", () => {
      modalBlock.classList.add("show");
    });

    btnsNext.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("nextSlide works");
        nextSlide();
      });
    });

    btnsPrev.forEach((btn) => {
      btn.addEventListener("click", () => {
        let currentSlide = document.querySelector(".current");
        currentSlide.classList.remove("current");
        console.log(currentSlide.previousElementSibling);
        if (currentSlide.previousElementSibling) {
          currentSlide.previousElementSibling.classList.add("current");
        } else {
          slides[slides.length - 1].classList.add("current");
        }
      });
    });
  } else {
    img.src = "img/tetrisCol-modified.png";
    lamp.src = "img/light.png";
    lamp.classList.remove("lampOn");
    gifTetris.style.display = "none";
  }
}

closesModalWindow.forEach((close) => {
  close.addEventListener("click", () => {
    modalBlock.classList.remove("show");
    const currentSlide = document.querySelector(".current");
    console.log(currentSlide);
    currentSlide.classList.remove("current");
    console.log(parentSlide.firstElementChild);
    parentSlide.firstElementChild.classList.add("current");
  });
});

function nextSlide() {
  const currentSlide = document.querySelector(".current");
  currentSlide.classList.remove("current");
  if (currentSlide.nextElementSibling) {
    currentSlide.nextElementSibling.classList.add("current");
  } else {
    slides[0].classList.add("current");
  }
}
