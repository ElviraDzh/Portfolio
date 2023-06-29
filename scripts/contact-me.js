function log(text) {
  console.log(text);
}

const width = window.innerWidth,
  height = window.innerHeight,
  envelopID = document.getElementById("post-box__delivered"),
  container = document.getElementById("contact-me__img"),
  contactMe = document.querySelector(".contact-me__text"),
  popUp = document.getElementById("pop-up"),
  formInfo = document.getElementById("contact-me__form"),
  sendButton = document.getElementById("send-button"),
  postBox = document.querySelector(".post-box"),
  character = document.querySelector(".character"),
  characterMessage = document.querySelector(".character__message__text"),
  characterMessageFrame = document.getElementById("character__message"),
  arrayOfMessageText = characterMessage.textContent.split("");

function blurBackGround() {
  setTimeout(() => {
    container.classList.add("blur");
  }, 1000);
}

function showEnvelop() {
  return new Promise((resolve) => {
    setTimeout(() => {
      popUp.classList.add("show");
      formInfo.classList.add("show");
      resolve(), 1000;
    });
  });
}

contactMe.addEventListener("click", () => {
  showEnvelop().then(blurBackGround);
});

function sendEnvelop() {
  formInfo.style.transition = "0.7s";
  formInfo.classList.remove("show");

  setTimeout(() => {
    container.classList.remove("blur");
    container.classList.add("remove-blur");
    popUp.classList.toggle("animation");
  }, 1000);
}

function postBoxSection() {
  popUp.style.display = "none";
  setTimeout(() => {
    postBox.style.display = "block";
    postBox.style.display = "block";
    // backToMonitor();
    // postBoxBlock();
  }, 500);
}

function postBoxBlock() {
  setTimeout(() => {
    popUp.classList.remove("show");
    popUp.classList.remove("animation");
    popUp.style.display = "block";
    formInfo.classList.remove("show");
    postBox.style.display = "none";
    postBox.classList.remove("remove-post-box");
  }, 6500);
}

function backToMonitor() {
  setTimeout(() => {
    container.classList.remove("remove-blur");
    postBox.classList.toggle("remove-post-box");
  }, 4000);
}

sendButton.addEventListener("click", () => {
  sendEnvelop();
  setTimeout(postBoxSection, 3000);
});
