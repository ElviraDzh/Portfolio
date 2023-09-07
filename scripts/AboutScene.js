class AboutScene {
  #sceneSection = getById("about-scene");
  #center = SCREEN.centerX;
  //#speed = 1;
  #speed = 2;
  #animation = null;

  #start = SCREEN.centerX;
  #end = 4000;
  #animations = [
    {
      image: getById("about-billboard-1-arrow"),
    },
    {
      image: getById("about-billboard-2-girl"),
    },
    {
      image: getById("about-billboard-3-girl"),
    },
    {
      image: getById("about-billboard-4-balloon"),
    },
    {
      image: getById("about-billboard-5-butterfly"),
    },
  ];

  #layers = [
    // this.#initLayer("mountains", 0.1, true),
    // this.#initLayer("city-panorama", 0.2, true),
    // this.#initLayer("front-city", 0.3, true),
    // this.#initLayer("about-billboards", 0.8, false),
    // this.#initLayer("park", 0.8, true),
    // this.#initLayer("about-road", 1, false),
    // this.#initLayer("grass", 2, true),
    this.#initLayer("mountains", 0.2, true),
    this.#initLayer("city-panorama", 0.4, true),
    this.#initLayer("front-city", 0.6, true),
    this.#initLayer("about-billboards", 1.6, false),
    this.#initLayer("park", 1.6, true),
    this.#initLayer("about-road", 2, false),
    this.#initLayer("grass", 4, true),
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
  skaterImg = getById("about-skater");
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
      const skaterLeft = this.skaterImg.getBoundingClientRect().left; // skater's position relative to viewport
      const skaterRight = this.skaterImg.getBoundingClientRect().right;
      const skaterCenter = (skaterLeft + skaterRight) / 2;
      const billboardLeft = this.#animation.image.getBoundingClientRect().left; // billboard's position relative to viewport
      const billboardRight =
        this.#animation.image.getBoundingClientRect().right;
      // There is the current animation. "Unmark" the current animation when the scene goes out of the current animation,
      //so the scene can properly handle animation again when comes back.

      if (
        (direction === 1 && billboardRight < skaterCenter) ||
        (direction === -1 && billboardLeft > skaterCenter)
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
    const skaterLeft = this.skaterImg.getBoundingClientRect().left;
    const skaterRight = this.skaterImg.getBoundingClientRect().right;
    const skaterCenter = (skaterLeft + skaterRight) / 2;
    for (let i = 0; i < this.#animations.length; i++) {
      const animation = this.#animations[i];
      const billboardLeft = animation.image.getBoundingClientRect().left;
      const billboardRight = animation.image.getBoundingClientRect().right;
      if (skaterCenter >= billboardLeft && skaterCenter <= billboardRight) {
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
