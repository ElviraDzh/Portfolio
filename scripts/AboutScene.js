class AboutScene {
  #center = SCREEN.centerX;
  #speed = 3;

  #start = SCREEN.centerX;
  #end = 4000;

  #layers = [
    this.#initLayer("mountains", 0.1, true),
    this.#initLayer("city-panorama", 0.2, true),
    this.#initLayer("front-city", 0.3, true),
    this.#initLayer("about-billboards", 0.8, false),
    this.#initLayer("park", 0.8, true),
    this.#initLayer("about-road", 1, false),
    this.#initLayer("grass", 2, true),
  ];

  #initLayer(id, step, moveBackground) {
    return {
      layer: getById(id),
      step: step, // px to move in parallax.
      left: 0, // Left position of the layer.
      moveBackground: moveBackground,
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
      if (layer.moveBackground)
        layer.layer.style.backgroundPositionX = layer.left + "px";
      else layer.layer.style.left = layer.left + "px";
    }

    return true;
  }
}
