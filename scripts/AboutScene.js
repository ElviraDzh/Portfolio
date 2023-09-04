class AboutScene {
  #sceneSection = getById("about-scene");
  #center = SCREEN.centerX;
  #speed = 3;
  #animation = null;

  #start = SCREEN.centerX;
  #end = 3340;
  #animations = [
    {
      start: 390,
      end: 500,
      image: getById("about-billboard-1-arrow"),
    },
    {
      start: 660,
      end: 930,
      image: getById("about-billboard-2-girl"),
    },
    {
      start: 1826,
      end: 2065,
      image: getById("about-billboard-3-girl"),
    },
    {
      start: 2600,
      end: 2840,
      image: getById("about-billboard-4-balloon"),
    },
    {
      start: 3133,
      end: 3278,
      image: getById("about-billboard-5-butterfly"),
    },
  ];

  #layers = [
    this.#initLayer("mountains", 0.1, true),
    this.#initLayer("city-panorama", 0.2, true),
    this.#initLayer("front-city", 0.3, true),
    // this.#initLayer("about-billboards", 0.8, false),
    this.#initLayer("about-billboards", 5, false),
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
    console.log(this.#center);
    return true;
  }

  // Returns true if the scene can move in a given direction. Otherwise, false.
  // For example, reaching the end of scene.
  move(direction, smoothFactor) {
    if (!this.canMove(direction)) return false;

    this.#center += direction * this.#speed * smoothFactor;
    this.#handleAnimations(direction);

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

  // Handles showing or hiding of animations on the billboards.
  #handleAnimations(direction) {
    if (this.#animation !== null) {
      // There is the current animation. "Unmark" the current animation when the scene goes out of the current animation,
      // so the scene can properly handle animation again when comes back.
      if (
        (direction === 1 && this.#animation.end < this.#center) ||
        (direction === -1 && this.#animation.start > this.#center)
      ) {
        this.#handleImage(false);
        this.#animation = null;
      }
    } else {
      // No current animation. Start animation if get within any of animations.
      const animation = this.#getAnimation();
      if (animation !== null) {
        this.#animation = animation;
        this.#handleImage(true);
      }
    }
  }

  #getAnimation() {
    for (let i = 0; i < this.#animations.length; i++) {
      const animation = this.#animations[i];
      if (this.#center >= animation.start && this.#center <= animation.end) {
        return animation;
      }
    }

    // Not within any of animations.
    return null;
  }

  #handleImage(useGif) {
    const image = this.#animation.image;
    image.src = useGif
      ? image.src.replace(".png", ".gif")
      : image.src.replace(".gif", ".png");
  }
}
