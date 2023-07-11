class KeyHandler {
  #skater;

  constructor(skater) {
    this.#skater = skater;

    // Without *.bind(this), "this" is referencing to the DOM element, not the class itself.
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    // Ignore if the skater is performing another action.
    if (this.#skater.isChanging()) return;

    if (event.code === "ArrowUp") {
      this.#skater.jump();
    } else if (event.code === "ArrowRight") {
      this.#skater.rollRight();
    } else if (event.code === "ArrowLeft") {
      this.#skater.rollLeft();
    } else if (event.code === "ArrowDown") {
      this.#skater.stop();
    } else if (event.code === "Space") {
      this.#skater.fall()
    }
  }
}