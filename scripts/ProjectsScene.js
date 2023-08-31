class ProjectsScene {
  #sceneSection = getById("projects-scene");
  #center = SCREEN.centerX;
  #speed = 3;
  #stopIndex = null;

  #start = SCREEN.centerX;
  #end = 5800;
  #stops = [
    // {
    //   start: 1116,
    //   end: 1226,
    // },
  ];

  #layers = [
    this.#initLayer("projects-mountains", 1, true),
    this.#initLayer("projects-trees-far", 1.1, true),
    this.#initLayer("projects-trees-middle", 1.25, true),
    this.#initLayer("projects-bushes", 1.5, true),
    this.#initLayer("projects-cable-lines", 2, true),
    this.#initLayer("projects-trees-near", 3, true),
    this.#initLayer("projects-road", 3, false),
    this.#initLayer("projects-billboards", 3, false),
    this.#initLayer("projects-grasses", 5, true),
  ];

  #initLayer(id, step, moveBackground) {
    return {
      layer: getById(id),
      step: step, // px to move in parallax.
      left: 0, // Left position of the layer.
      moveBackground: moveBackground,
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
    for (const layerObj of this.#layers) {
      layerObj.left -= direction * layerObj.step * smoothFactor;
      if (layerObj.moveBackground) {
        // moveBackground property defines layer(div) has background-image or not. If it has, layer's background-position changes, if it has not layer move itself with position.
        layerObj.layer.style.backgroundPositionX = layerObj.left + "px";
      } else {
        layerObj.layer.style.left = layerObj.left + "px";
      }
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
