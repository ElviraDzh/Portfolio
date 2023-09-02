const modalBox = document.querySelector(".modal");
const slides = document.querySelectorAll(".modalImgTetris");
const parentSlide = document.querySelector(".slides");
const btnsPrev = document.querySelectorAll(".btn-prev");
const btnsNext = document.querySelectorAll(".btn-next");
const closesInModalBox = document.querySelectorAll(".close");
const overlayBillboards = getById("overlay-billboards");
const overlayProjectScene = getById("overlay-modal");

console.log(overlayProjectScene);

overlayBillboards.addEventListener("click", () => {
  console.log("you clicked overlay");
  showModalBox();
});

function showModalBox() {
  modalBox.classList.add("show");
  overlayProjectScene.classList.add("changeBackground");
}

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

closesInModalBox.forEach((close) => {
  close.addEventListener("click", () => {
    modalBox.classList.remove("show");
    const currentSlide = document.querySelector(".current");
    console.log(currentSlide);
    currentSlide.classList.remove("current");
    console.log(parentSlide.firstElementChild);
    parentSlide.firstElementChild.classList.add("current");
    overlayProjectScene.classList.remove("changeBackground");
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
