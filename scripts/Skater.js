class Skater {
  // List states the skater can have.
  #States = {
    IDLE: "idle",
    ROLLING_RIGHT: "rolling-right",
    ROLLING_LEFT: "rolling-left",
  };

  #StateImages = {
    JUMPING: {
      image: "images/skater/jumping.gif",
      duration: 840, // Duration of the gif in milliseconds.
    },
    IDLE: {
      image: "images/skater/idle.gif",
      duration: 0, // 0 is for infinite, i.e. no need to set another gif after this one.
    },
    START_ROLLING: {
      image: "images/skater/start-rolling.gif",
      duration: 2280,
    },
    ROLLING: {
      image: "images/skater/rolling.gif",
      duration: 1000,
    },
    STOPPING: {
      image: "images/skater/stopping.gif",
      duration: 360,
    },
    REVERSING: {
      image: "images/skater/reversing.gif",
      duration: 300,
    },
    FALLING: {
      image: "images/skater/falling.gif",
      duration: 780,
    },
  };

  #image = getById("skater");
  #state = this.#States.IDLE;

  // List of states when changing from one state to another.
  #changeStateImages = [];

  jump() {
    // Depending on the current state, we have to create a sequence of states.
    if (this.#state === this.#States.IDLE) {
      this.#changeStateImages = [
        this.#StateImages.IDLE,
        this.#StateImages.JUMPING,
      ];
    } else if (
      this.#state === this.#States.ROLLING_RIGHT ||
      this.#state === this.#States.ROLLING_LEFT
    ) {
      this.#changeStateImages = [
        this.#StateImages.ROLLING,
        this.#StateImages.JUMPING,
      ];
    }

    this.#handleStateChange();
  }

  rollRight() {
    // If the previous rolling side was left, remove image flip.
    // Otherwise the skater moves left instead of right.
    this.#image.classList.remove("flip-image");

    this.#changeStateImages = [
      this.#StateImages.ROLLING,
      this.#StateImages.START_ROLLING,
    ];

    this.#handleStateChange();
    this.#state = this.#States.ROLLING_RIGHT;
  }

  rollReverse() {
    this.#changeStateImages = [
      this.#StateImages.ROLLING,
      this.#StateImages.REVERSING,
      this.#StateImages.STOPPING,
    ];

    this.#handleStateChange();

    this.#state =
      this.#state === this.#States.ROLLING_RIGHT
        ? this.#States.ROLLING_LEFT
        : this.#States.ROLLING_RIGHT;
  }

  rollLeft() {
    // Flip the image to make the skater rolling left.
    this.#image.classList.add("flip-image");

    this.#changeStateImages = [
      this.#StateImages.ROLLING,
      this.#StateImages.START_ROLLING,
    ];

    this.#handleStateChange();
    this.#state = this.#States.ROLLING_LEFT;
  }

  stop() {
    this.#changeStateImages = [
      this.#StateImages.IDLE,
      this.#StateImages.STOPPING,
    ];

    this.#handleStateChange();
    this.#state = this.#States.IDLE;
  }

  fall() {
    this.#changeStateImages = [
      this.#StateImages.IDLE,
      this.#StateImages.FALLING,
    ];

    this.#handleStateChange();
    this.#state = this.#States.IDLE;
  }

  isChanging() {
    // If changeStates is not empty, the skater is changing from one state to another.
    return this.#changeStateImages.length > 0;
  }

  #handleStateChange() {
    const state = this.#changeStateImages.pop();
    this.#image.src = state.image; // skater

    // If it is reversing rolling direction, flip images.
    if (state.image.includes("reversing")) {
      this.#image.classList.toggle("flip-image");
    }

    // If there are more state gifs left, continue showing them.
    if (this.#changeStateImages.length > 0) {
      // Without *.bind(this), "this" is referencing to the timer event, not the class itself.
      setTimeout(this.#handleStateChange.bind(this), state.duration);
    }
  }
}
