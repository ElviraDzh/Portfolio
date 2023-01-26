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

function log(s) {
    console.log(s);
}
let prevX = 0;
let targetLeft = 0;

// Start near the first frame
wrapperChar.style.left = "3%";

/*
// Will be usefull to calc the targetLeft value with different screens
document.addEventListener('keydown', function(e) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    switch (event.key) {
    case "ArrowLeft":
	move(-0.2);
        break;
    case "ArrowRight":
	move(0.2);
        break;
    case "ArrowUp":
        break;
    case "ArrowDown":
        break;
    }

    log("left: " + wrapperChar.style.left);
});

function move(k) {
    counterX += k;
    wrapperChar.style.left = counterX + "%";
}
*/

function onInterval() {
    let x = wrapper.getBoundingClientRect().x;

    if (x === prevX) {
	// No scrolling 
	return;
    }

    handleScroll(x);

    prevX = x;
}

setInterval(onInterval, 500);

function handleScroll(x) {
    // The final position where the girl should be.
    // The value -14 will be different for different screen sizes.
    targetLeft = x / -14; 

    log("x: " + x);
    log("targetLeft: " + targetLeft);

    animation.classList.add("animation");
    animation.style.animationName = "walkRight"; 
    
    walk();
}

function walk() {
    const leftFull = wrapperChar.style.left; // Example: "0.8%"
    const leftStr = leftFull.substring(0, leftFull.indexOf('%')); // Example: "0.8"
    const left = parseFloat(leftStr);

    log("left: " + left);

    if (left > targetLeft) {
	// The girl reached the target position
	stopWalk();
	return;
    }

    wrapperChar.style.left = (left + 0.2) + "%";

    setTimeout(walk, 20);
}

function stopWalk() {
  animation.classList.remove("animation");
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
