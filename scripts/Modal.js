const closeInModalBox = getById("close-modal-box");
const overlayBillboard = getById("overlay-billboard");
const overlayProjectScene = getById("overlay-modal");
const modalTV = getById("modal-tv");
const slidesContainer = document.getElementById("slides-container");
console.log(slidesContainer);
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

const modalBoxContents = [
  {
    name: "selectiq",
    html: `<li class="slide">
    <img
      src="/images/projects/modal/modal-content/selectiq/01.png"
      alt="selectiq"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/selectiq/02.png"
      alt="selectiq"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/selectiq/03.png"
      alt="selectiq"
      class="img-content"
    />
  </li>
  <li class="slide">
  <img
    src="./images/projects/modal/modal-content/selectiq/04.png"
    alt="selectiq"
    class="img-content"
  />
</li>
<li class="slide">
<img
  src="./images/projects/modal/modal-content/selectiq/05.png"
  alt="selectiq"
  class="img-content"
/>
</li>
<li class="slide">
<img
  src="./images/projects/modal/modal-content/selectiq/06.png"
  alt="selectiq"
  class="img-content"
/>
</li>
<li class="slide">
<img
  src="./images/projects/modal/modal-content/selectiq/07.png"
  alt="selectiq"
  class="img-content"
/>
</li>`,
  },
  {
    name: "proassess",
    html: ` <li class="slide">
    <img
      src="/images/projects/modal/modal-content/proassess/01.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/02.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/03.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/04.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/05.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/06.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/07.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/08.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/09.png"
      alt="proassess"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/proassess/10.png"
      alt="proassess"
      class="img-content"
    />
  </li>`,
  },
  {
    name: "research",
    html: ` <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/01.jpg"
      alt="research"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/02.jpg"
      alt="research"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/03.jpg"
      alt="research"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/04.jpg"
      alt="research"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/05.jpg"
      alt="research"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/06.jpg"
      alt="research"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="/images/projects/modal/modal-content/research/07.jpg"
      alt="research"
      class="img-content"
    />
  </li>`,
  },
  {
    name: "tetris",
    html: `<li class="slide">
    <img
      src="/images/projects/modal/modal-content/tetris/aboutTetris.png"
      alt="tetris"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/tetris/Group 7.png"
      alt="tetris"
      class="img-content"
    />
  </li>
  <li class="slide">
    <img
      src="./images/projects/modal/modal-content/tetris/Group 8.png"
      alt="tetris"
      class="img-content"
    />
  </li>`,
  },
];

function showModalBox() {
  // if (modalTV) {
  //   modalMobile.classList.remove("show");
  //   modalTV.classList.add("show");
  //   overlayProjectScene.classList.add("changeBackground");
  // } else {
  //   modalTV.classList.remove("show");
  //   modalMobile.classList.add("show");
  //   overlayProjectScene.classList.add("changeBackground");
  // }
  const idOfBillboard = PROJECTS_SCENE.getStopId();
  for (let i = 0; i < modalBoxContents.length; i++) {
    if (idOfBillboard === modalBoxContents[i].name) {
      const modalContent = getById("slides-container");
      modalContent.innerHTML = modalBoxContents[i].html;
    }
  }
  modalTV.classList.add("show");
  overlayProjectScene.classList.add("changeBackground");
}

closeInModalBox.addEventListener("click", () => {
  modalTV.classList.remove("show");
  overlayProjectScene.classList.remove("changeBackground");
  slidesContainer.scrollLeft = 0;
});

nextButton.addEventListener("click", () => {
  const slide = document.querySelector(".slide");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slide = document.querySelector(".slide");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});
