class SceneWrapper {
  #direction = 0;    // -1 - moving left; 0 - stopped; 1 - moving right.
  #smoothness = [];  // To make starting of moving smooth.

  ignoreKeys() {
    // To avoid handling several pressed at the same time.
    return SKATER.isChanging();
  }

  onInterval() {
    // Ignore if stopped.
    if (this.#direction === 0) return;

    const smoothFactor = this.#smoothness.length > 0 ? this.#smoothness.shift() : 1;

    if (!CURRENT_SCENE.move(this.#direction, smoothFactor)) {
      this.down();
    }
  }

  up() {
    SKATER.jump();
  }

  moveRight() {
    // Already moving right. 
    if (this.#direction === 1) return;

    // The current scene can't move.
    if (!CURRENT_SCENE.canMove(1)) {
      SKATER.stop();
      return;
    } 
    
    if (this.#direction === -1) {
      // Currently moving left. Reverse.    
      this.#moveReverse();
      SKATER.rollReverse();
      return;
    }

    // Start moving.
    this.#direction = 1;
    this.#smoothness = this.#getMovingSmoothness();
    SKATER.rollRight();
  }

  moveLeft() {
    // Already moving left.
    if (this.#direction === -1) return;

    // The current scene can't move.
    if (!CURRENT_SCENE.canMove(-1)) {
      SKATER.stop();
      return;
    } 

    if (this.#direction === 1) {
      // Currently moving right. Reverse.    
      this.#moveReverse();
      SKATER.rollReverse();
      return;
    }

    // Start moving.
    this.#direction = -1;
    this.#smoothness = this.#getMovingSmoothness();
    SKATER.rollLeft();
  }

  down() {
    this.#direction = 0;
    SKATER.stop();
  }

  #moveReverse() {
    this.#direction *= -1;
  }

  #getMovingSmoothness() {
    return [
      new Array(20).fill(0),
      new Array(20).fill(0.1),
      new Array(20).fill(0.2),
      new Array(20).fill(0.4),
      new Array(20).fill(0.6),
      new Array(20).fill(0.8),
    ].flat();
  }
}