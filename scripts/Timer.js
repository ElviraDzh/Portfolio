// ----------------------------------------------------------------------------
// Handles timer/interval related functions. Mainly for the background parallax 
// movement.
// ----------------------------------------------------------------------------
class Timer {
  #interval = 1000 / 60; // Frames per second.

  start() {
    setTimeout(this.#onInterval.bind(this), this.#interval);
  }

  #onInterval() {
    SCENE_WRAPPER.onInterval();
    setTimeout(this.#onInterval.bind(this), this.#interval);
  }
}