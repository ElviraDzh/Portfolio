const closeInModalBox = getById("close-modal-box");
const overlayBillboard = getById("overlay-billboard");
const overlayAll = getById("overlay-modal");
const modalTV = getById("modal-tv");
const slidesContainer = document.getElementById("slides-container");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const billboardImages = document.querySelectorAll(
  ".projects-billboards-content"
);
const tv = getById("tv-set");
const tvStand = getById("tv-stand");

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
  const billboardId = PROJECTS_SCENE.getStopId();
  if (billboardId === null) return;
  for (let i = 0; i < modalBoxContents.length; i++) {
    if (billboardId === modalBoxContents[i].name) {
      const modalContent = getById("slides-container");
      modalContent.innerHTML = modalBoxContents[i].html;
    }
  }
  modalTV.classList.add("show");
  overlayAll.classList.add("changeBackground");
  tv.classList.add("shift");
  tvStand.classList.add("shift");
}

closeInModalBox.addEventListener("click", () => {
  modalTV.classList.remove("show");
  overlayAll.classList.remove("changeBackground");
  slidesContainer.scrollLeft = 0;
  tv.classList.remove("shift");
  tvStand.classList.remove("shift");
});

nextButton.addEventListener("click", () => {
  const slide = document.querySelector(".slide");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  console.log("click");
  const slide = document.querySelector(".slide");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});

billboardImages.forEach((img) => {
  img.addEventListener("click", () => {
    showModalBox();
  });
});
