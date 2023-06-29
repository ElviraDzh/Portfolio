class KeyHandler {
  #skater;

  constructor(skater) {
    this.#skater = skater;

    // Without *.bind(this), "this" is referencing to the DOM element, not the class itself.
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  // ArrowDown ArrowLeft ArrowRight
  onKeyDown(event) {
    if (event.code === "ArrowUp") {
        this.#skater.jump();
    } 
  }
}