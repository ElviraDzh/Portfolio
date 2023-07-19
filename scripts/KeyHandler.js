class KeyHandler {
  constructor() {
    // Without *.bind(this), "this" is referencing to the DOM element, not the class itself.
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    // To avoid concurrency handling of events.
    if (SCENE_WRAPPER.ignoreKeys()) return;

    if (event.code === "ArrowUp") {
      SCENE_WRAPPER.up();
    } else if (event.code === "ArrowRight") {
      SCENE_WRAPPER.moveRight();
    } else if (event.code === "ArrowLeft") {
      SCENE_WRAPPER.moveLeft();
    } else if (event.code === "ArrowDown") {
      SCENE_WRAPPER.down();
    }
  }
}