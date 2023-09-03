class ProjectsScene {
  #sceneSection = getById("projects-scene");
  #center = SCREEN.centerX;
  #speed = 3;
  #currentStop = null;

  #start = SCREEN.centerX;
  #end = 3880;
  #stops = [
    {
      start: 730,
      end: 760,
      image: getById("projects-b1-imgTetris"),
    },
    {
      start: 1480,
      end: 1510,
      image: getById("projects-billboard-2-tetris"),
    },
    {
      start: 2225,
      end: 2255,
      image: getById("projects-billboard-3-tetris"),
    },
    {
      start: 2880,
      end: 2910,
      image: getById("projects-billboard-4-tetris"),
    },
    {
      start: 3533,
      end: 3563,
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
      // There is the current stop. "Unmark" the current stop when the scene goes out of the current stop,
      // so the scene can properly stop again when comes back.
      if (
        (direction === 1 && this.#currentStop.end < this.#center) ||
        (direction === -1 && this.#currentStop.start > this.#center)
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
    for (let i = 0; i < this.#stops.length; i++) {
      const stop = this.#stops[i];
      if (this.#center >= stop.start && this.#center <= stop.end) {
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
    overlayBillboards.style.display = useGif ? "block" : "none";
  }
}
