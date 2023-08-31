class ProjectScene {
  #sceneSection = getById("projects-scene");
  #center = SCREEN.centerX;
  #speed = 3;
  #stopIndex = null;

  #start = SCREEN.centerX;
  #end = 1500;
  #stops = [
    {
      start: 2000,
      end: 2100,
    },
    // {
    //     start: 2000,
    //     end: 2100,
    // },
  ];

  #layers = [
    this.#initLayer("layer-1", 1),
    this.#initLayer("layer-2", 1.1),
    this.#initLayer("layer-3", 1.25),
    this.#initLayer("layer-4", 1.5),
    this.#initLayer("layer-5", 2),
    this.#initLayer("layer-6", 3),
    this.#initLayer("layer-8", 5),
  ];

  #initLayer(id, step) {
    return {
      layer: getById(id),
      step: step, // px to move in parallax.
      left: 0, // Left position of the layer.
    };
  }

  show(visible) {
    this.#sceneSection.style.display = visible ? "block" : "none";
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
    if (!this.canMove(direction) || !this.#handleStops(direction)) return false;

    this.#center += direction * this.#speed;

    // Move layers.
    for (const layer of this.#layers) {
      layer.left -= direction * layer.step * smoothFactor;
      layer.layer.style.backgroundPositionX = layer.left + "px";
    }

    return true;
  }

  // Returns true if there is no stop and can continue moving.
  #handleStops(direction) {
    if (this.#stopIndex !== null) {
      // There is the current stop. "Unmark" the current stop when the scene goes out of the current stop,
      // so the scene can properly stop again when comes back.
      const stop = this.#stops[this.#stopIndex];
      if (
        (direction === 1 && stop.end < this.#center) ||
        (direction === -1 && stop.start > this.#center)
      ) {
        this.#stopIndex = null;
      }
    } else {
      // No current stop. Stop the scene if get within any of stops.
      const index = this.#getStopIndex();
      if (index !== null) {
        this.#stopIndex = index;
        return false;
      }
    }

    return true;
  }

  #getStopIndex() {
    for (let i = 0; i < this.#stops.length; i++) {
      const stop = this.#stops[i];
      if (this.#center >= stop.start && this.#center <= stop.end) {
        return i;
      }
    }

    // Not within any of stops.
    return null;
  }
}
