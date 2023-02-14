const character = document.getElementById("character");
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

let left;

function randomPositionBrick() {
  const brick = document.createElement("span");
  brick.classList.add("brick");

  const bricksArrSrc = ["../img/brick2.png", "../img/brick1.png"];
  let randomNum = Math.round(Math.random());
  brick.style.background = `url(${bricksArrSrc[randomNum]}) no-repeat`;
  brick.style.backgroundSize = "contain";

  let randomPositionTop = Math.round(Math.random() * 89);
  let randomPositionLeft = Math.round(Math.random() * 97);
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

let prevX = 0;
let targetLeft = 0;
let backStep = 0;

// Start near the first frame
wrapperChar.style.left = "9%";

//Will be usefull to calc the targetLeft value with different screens
// document.addEventListener("keydown", function (e) {
//   const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

//   switch (event.key) {
//     case "ArrowLeft":
//       move(-0.2);
//       break;
//     case "ArrowRight":
//       move(0.2);
//       break;
//     case "ArrowUp":
//       break;
//     case "ArrowDown":
//       break;
//   }

//   // log("left: " + wrapperChar.style.left);
// });

// function move(k) {
//   counterX += k;
//   wrapperChar.style.left = counterX + "%";
// }

function onInterval() {
  let x = wrapper.getBoundingClientRect().x; // find wrappers x position  relative to viewport
  if (x === prevX) {
    // No scrolling
    return;
  }
  // The final position where the girl should be.
  targetLeft = x / getScrollStep();

  if (x > prevX) {
    walkLeft();
  } else {
    walkRight();
  }

  prevX = x;
}

setInterval(onInterval, 500); //check to know when scroll stops.
document.addEventListener("touchstart", () => {
  console.log("start");
  // console.log(e.changedTouches[0].pageX);
  // wrapperChar.style.left = `${e.changedTouches[0].pageX}px`;
  character.classList.add("animation");
  character.style.animationName = "walkRight";
});

document.addEventListener("touchmove", (e) => {
  [...e.changedTouches].forEach((touch) => {
    wrapperChar.style.left = `${touch.pageX - 150}px`;
    console.log(touch.pageX);
  });
  console.log("move");
});

document.addEventListener("touchend", () => {
  character.classList.remove("animation");
  console.log("end");
});

// function getScrollStep() {
//   let screenSize = window.innerWidth;
//   if (screenSize <= 414) {
//     return -15;
//   } else if (screenSize <= 540) {
//     return -18;
//   } else if (screenSize <= 712) {
//     return -23;
//   } else if (screenSize <= 768) {
//     return -27;
//   } else if (screenSize <= 844) {
//     return -28;
//   } else if (screenSize <= 916) {
//     return -32;
//   } else if (screenSize <= 1024) {
//     return -36;
//   } else if (screenSize <= 1180) {
//     return -41;
//   } else if (screenSize <= 1280) {
//     return -46;
//   } else if (screenSize <= 2150) {
//     return -70;
//   }
// }

function getScrollStep() {
  let screenSize = window.innerWidth;
  return -Math.round(screenSize / 28.5);
}

function walkLeft() {
  const leftFull = wrapperChar.style.left; // Example: "0.8%"
  left = parseFloat(leftFull); //parses a value as a string and returns the first number.
  character.classList.add("animation");
  character.style.animationName = "walkLeft";
  character.style.backgroundPosition = "-432px 0px";
  if (left < targetLeft) {
    console.log("targetLeft: " + targetLeft);
    // The girl reached the target position
    stopWalk();
    return;
  }
  if (window.innerWidth > 652) {
    changeImgToColor(58, 63.8, imgLampTetris, tetrisImg);
  } else if (window.innerWidth > 450) {
    changeImgToColor(54.5, 63.8, imgLampTetris, tetrisImg);
  } else if (window.innerWidth < 450) {
    changeImgToColor(50, 63.8, imgLampTetris, tetrisImg);
  }
  console.log(window.innerWidth);
  wrapperChar.style.left = left - 0.2 + "%";
  console.log("Left: " + wrapperChar.style.left);
  setTimeout(walkLeft, 20);
}

function walkRight() {
  const leftFull = wrapperChar.style.left; // Example: "0.8%"
  left = parseFloat(leftFull); //parses a value as a string and returns the first number.

  character.classList.add("animation");
  character.style.animationName = "walkRight";
  character.style.backgroundPosition = "-440px -359px";
  if (left > targetLeft) {
    // The girl reached the target position
    stopWalk();
    return;
  }

  wrapperChar.style.left = left + 0.2 + "%";
  console.log("Left: " + left);
  if (window.innerWidth > 652) {
    changeImgToColor(58, 63.8, imgLampTetris, tetrisImg);
  } else if (window.innerWidth > 450) {
    changeImgToColor(54.5, 63.8, imgLampTetris, tetrisImg);
  } else if (window.innerWidth < 450) {
    changeImgToColor(50, 63.8, imgLampTetris, tetrisImg);
  }

  console.log("Left: " + wrapperChar.style.left);
  setTimeout(walkRight, 20);
}

function stopWalk() {
  character.classList.remove("animation");
}

function changeImgToColor(min, max, lamp, img) {
  if (left > min && left < max) {
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
