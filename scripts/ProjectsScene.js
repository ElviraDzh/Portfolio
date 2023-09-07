class ProjectsScene {
  #sceneSection = getById("projects-scene");
  #center = SCREEN.centerX;
  #speed = 3;
  #currentStop = null;

  #start = SCREEN.centerX;
  #end = 3880;
  #stops = [
    {
      image: getById("projects-billboard-1-tetris"),
    },
    {
      image: getById("projects-billboard-2-tetris"),
    },
    {
      image: getById("projects-billboard-3-tetris"),
    },
    {
      image: getById("projects-billboard-4-tetris"),
    },
    {
      image: getById("projects-billboard-5-tetris"),
    },
  ];

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

  skaterImg = getById("projects-skater");
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
    this.#center += direction * this.#speed * smoothFactor;

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
      const skaterLeft = this.skaterImg.getBoundingClientRect().left; // skater's position relative to viewport
      const skaterRight = this.skaterImg.getBoundingClientRect().right;
      const billboardLeft =
        this.#currentStop.image.getBoundingClientRect().left; // billboard's position relative to viewport
      const billboardRight =
        this.#currentStop.image.getBoundingClientRect().right;
      // There is the current stop. "Unmark" the current stop when the scene goes out of the current stop,
      // so the scene can properly stop again when comes back.
      if (
        (direction === 1 && billboardRight < skaterRight) ||
        (direction === -1 && billboardLeft > skaterLeft)
      ) {
        this.#handleImage(false);
        this.#currentStop = null;
      }
    } else {
      // No current stop. Stop the scene if get within any of stops.
      const stop = this.#getStop();
      if (stop !== null) {
        this.#currentStop = stop;
        this.#handleImage(true);
        return false;
      }
    }

    return true;
  }

  #getStop() {
    const skaterLeft = this.skaterImg.getBoundingClientRect().left;
    const skaterRight = this.skaterImg.getBoundingClientRect().right;
    for (let i = 0; i < this.#stops.length; i++) {
      const stop = this.#stops[i];
      const billboardLeft = stop.image.getBoundingClientRect().left;
      const billboardRight = stop.image.getBoundingClientRect().right;
      if (skaterLeft >= billboardLeft && skaterRight <= billboardRight) {
        return stop;
      }
    }

    // Not within any of stops.
    return null;
  }

  #handleImage(useGif) {
    const image = this.#currentStop.image;
    image.src = useGif
      ? image.src.replace(".png", ".gif")
      : image.src.replace(".gif", ".png");
    overlayBillboard.style.display = useGif ? "block" : "none";
  }
}
