//function revertDesk() {
//   console.log("revertDesk");
// }

// function postBoxObjects() {
//   envelopAppears();
//   charAppears();
// }

// function envelopAppears() {
//   setTimeout(() => {
//     envelopID.style.display = "block";
//   }, 2500);
// }

// function charAppears() {
//   setTimeout(() => {
//     character.style.display = "block";
//   }, 6000);
// }

// function postBoxObjectsNone() {
//   character.style.display = "none";
//   envelopID.style.display = "none";
//   characterMessageFrame.style.display = "none";
//   revertDesk();
// }

// let timer = null;
// let char = 0;
// characterMessage.textContent = "";

// function wrapLettersToSpan(arr, text, className) {
//   return arr.forEach((el) => {
//     return (text.innerHTML += `<span class ="${className}">${el}</span>`);
//   });
// }

// function messageTextanimation() {
//   wrapLettersToSpan(arrayOfMessageText, characterMessage, "each-letter");
//   setTimeout(() => {
//     characterMessageFrame.style.display = "block";
//     timer = setInterval(onTick, 50);
//   }, 11000);
// }

// function onTick() {
//   const span = characterMessage.querySelectorAll("span")[char];

//   if (span.getAttribute("class") === "fade") {
//     span.classList.toggle("each-letter");
//   } else {
//     span.classList.toggle("fade");
//   }
//   char++;

//   if (char === arrayOfMessageText.length) {
//     messageComplete();
//   }
// }

// function messageComplete() {
//   clearInterval(timer);
//   timer = null;
// }

function blurBackGround() {
  setTimeout(() => {
    container.classList.add("blur"); //added background img without envelop
  }, 1000);
}

function postBoxSection() {
  popUp.style.display = "none";
  setTimeout(() => {
    postBox.style.display = "block";
    // postBoxObjects();
    // messageTextanimation();
    backToMonitor();
    postBoxBlock();
  }, 500);
}

function postBoxBlock() {
  setTimeout(() => {
    postBox.style.display = "none";
    container.classList.remove("blur");
  }, 14500);
}

function backToMonitor() {
  setTimeout(() => {
    // postBoxObjectsNone();
    postBox.style.animationName = "postBoxNone";
  }, 12500);
}
