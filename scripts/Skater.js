class Skater {
  // List states the skater can be.
  #States = {
    IDLE: "IDLE",
    ROLLING_RIGHT: "ROLLING_RIGHT"
  }

  #StateImages = {
    JUMPING: {
      image: "./images/skater/jumping.gif",
      duration: 840 // Duration of the gif in milliseconds.
    },
    IDLE: {
      image: "./images/skater/idle.gif",
      duration: 0 // 0 is for infinite, i.e. no need to set another gif after this one.
    },
    START_ROLLING: {
      image: "./images/skater/start-rolling.gif",
      duration: 2280
    },
    ROLLING: {
      image: "./images/skater/rolling.gif",
      duration: 0
    },
    STOPPING: {
      image: "./images/skater/stopping.gif",
      duration: 360
    },
  }

  #image = byId("skater");
  #currentState = this.#States.IDLE;

  // List of states when changing from one state to another.
  #changeStateImages = [];

  jump() {
    // Depending on the current state, we have to create a sequence of states.
    if (this.#currentState === this.#States.IDLE) {
      this.#changeStateImages = [
        this.#StateImages.IDLE,
        this.#StateImages.JUMPING
      ];
    } else if (this.#currentState === this.#States.ROLLING_RIGHT) {
      this.#changeStateImages = [
        this.#StateImages.ROLLING,
        this.#StateImages.JUMPING
      ];
    } 

    this.#handleStateChange();
  }

  rollRight() {
    // Already rolling right. Ignore.
    if (this.#currentState === this.#States.ROLLING_RIGHT) return;

    this.#changeStateImages = [
      this.#StateImages.ROLLING,
      this.#StateImages.START_ROLLING
    ];
   
    this.#handleStateChange();

    this.#currentState = this.#States.ROLLING_RIGHT;
  }

  stop() {
    this.#changeStateImages = [
      this.#StateImages.IDLE,
      this.#StateImages.STOPPING
    ];
   
    this.#handleStateChange();

    this.#currentState = this.#States.IDLE;
  }

  isChanging() {
    // If changeStates is not empty, the skater is changing from one state to another.
    return this.#changeStateImages.length > 0;
  }

  #handleStateChange() {
    const state = this.#changeStateImages.pop();
    this.#image.src = state.image;

    // If there are more state gifs left, continue showing them. 
    if (this.#changeStateImages.length > 0) { 
      // Without *.bind(this), "this" is referencing to the timer event, not the class itself.
      setTimeout(this.#handleStateChange.bind(this), state.duration);
    }
  }
}