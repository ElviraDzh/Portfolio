class AboutScene {
  #center = SCREEN.centerX;
  #speed = 3;

  #start = SCREEN.centerX;
  #end = 5000;

  #layers = [
    this.#initLayer("mountains", 0.1),
    this.#initLayer("city-panorama", 0.2),
    this.#initLayer("front-city", 0.3),
    this.#initLayer("park", 0.8),
    this.#initLayer("grass", 2),
  ];

  #initLayer(id, step) {
    return {
      layer: getById(id),
      step: step, // px to move in parallax.
      left: 0, // Left position of the layer.
    };
  }

  // Returns true if the scene can move in a given direction.
  canMove(direction) {
    if (
      (direction === 1 && this.#center > this.#end) ||
      (direction === -1 && this.#center < this.#start)
    ) {
      // Reached the end or the start of the scene.
      return false;
    }

    return true;
  }

  // Returns true if the scene can move in a given direciton. Otherwise, false.
  // For example, reaching the end of scene.
  move(direction, smoothFactor) {
    if (!this.canMove(direction)) return false;

    this.#center += direction * this.#speed;

    // Move layers.
    for (const layer of this.#layers) {
      layer.left -= direction * layer.step * smoothFactor;
      layer.layer.style.backgroundPositionX = layer.left + "px";
    }

    return true;
  }
}
