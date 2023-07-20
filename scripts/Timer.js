// ----------------------------------------------------------------------------
// Handles timer/interval related functions. Mainly for the background parallax 
// movement.
// ----------------------------------------------------------------------------
class Timer {
  #fps = 60; // Frames per second.
  #scene; // The current scene, i.e. Projects.

  setScene(scene) {
    this.#scene = scene;
  }

  start() {
    const oneSecond = 1000;
    const interval = oneSecond / this.#fps;
    setInterval(this.#onInterval.bind(this), interval);
  }

  #onInterval() {
    if (this.#scene) {
      this.#scene.onInterval();
    }
  }
}