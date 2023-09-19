class ProjectsScene {
  #sceneSection = getById("projects-scene");
  #stops = [
    {
      image: getById("tetris"),
    },
    {
      image: getById("proassess"),
    },
    {
      image: getById("selectiq"),
    },
    {
      image: getById("research"),
    },
    {
      image: getById("gamefolio"),
    },
  ];
  #currentStop = null;
  #skaterImg = getById("projects-skater");

  #layers = [
    this.#initLayer("projects-mountains", 1, true),
    this.#initLayer("projects-trees-far", 1.1, true),
    this.#initLayer("projects-trees-middle", 1.25, true),
    this.#initLayer("projects-bushes", 1.5, true),
    this.#initLayer("projects-cable-lines", 2, true),
    this.#initLayer("projects-trees-near", 3, true),
    this.#initLayer("projects-road", 3, false),
    this.#initLayer("projects-street-lights", 3, false),
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
    const skater = this.#skaterImg.getBoundingClientRect();
    const roadEnd = getById("projects-road-closed").getBoundingClientRect()
      .left;
    const roadStart = getById("projects-road-cones").getBoundingClientRect()
      .right;

    if (
      (direction === 1 && skater.right > roadEnd) ||
      (direction === -1 && skater.left < roadStart)
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
    if (this.#currentStop !== null) {
      const skater = this.#skaterImg.getBoundingClientRect();
      const billboard = this.#currentStop.image.getBoundingClientRect(); // billboard's position relative to viewport
      // There is the current stop. "Unmark" the current stop when the scene goes out of the current stop,
      // so the scene can properly stop again when comes back.
      if (
        (direction === 1 && billboard.right < skater.right) ||
        (direction === -1 && billboard.left > skater.left)
      ) {
        this.#handleImage();
        this.#currentStop = null;
      }
    } else {
      // No current stop. Stop the scene if get within any of stops.
      const stop = this.#getStop();
      if (stop !== null) {
        this.#currentStop = stop;
        this.#handleImage();
        return false;
      }
    }

    return true;
  }

  #getStop() {
    const skater = this.#skaterImg.getBoundingClientRect();
    for (let i = 0; i < this.#stops.length; i++) {
      const stop = this.#stops[i];
      const billboard = stop.image.getBoundingClientRect();
      const padding = billboard.width * 0.24; //Padding variable helps to show interval where skater should stop(center of billboard) on defferent screens.
      if (
        skater.left >= billboard.left + padding &&
        skater.right <= billboard.right - padding
      ) {
        return stop;
      }
    }

    // Not within any of stops.
    return null;
  }

  #handleImage() {
    const isMobile = getComputedStyle(tv).backgroundImage === "none";
    overlayBillboard.style.display = isMobile ? "none" : "block";
  }

  getStopId() {
    return this.#currentStop.image.id;
  }
}
