class AboutScene {
  #sceneSection = getById("about-scene");
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
  roadStart = getById("road-cones").getBoundingClientRect().right;
  #center = this.roadStart;

  #speed = 3;
  #animation = null;
  skaterImg = getById("about-skater");

  #layers = [
    // this.#initLayer("mountains", 0.1, true),
    // this.#initLayer("city-panorama", 0.2, true),
    // this.#initLayer("front-city", 0.3, true),
    // this.#initLayer("about-billboards", 0.8, false),
    // this.#initLayer("park", 0.8, true),
    // this.#initLayer("about-road", 1, false),
    // this.#initLayer("grass", 2, true),
    this.#initLayer("mountains", 0.3, true),
    this.#initLayer("city-panorama", 0.6, true),
    this.#initLayer("front-city", 0.9, true),
    this.#initLayer("about-billboards", 2.4, false),
    this.#initLayer("park", 2.4, true),
    this.#initLayer("about-road", 3, false),
    this.#initLayer("grass", 6, true),
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
    const skaterRect = this.skaterImg.getBoundingClientRect();
    const roadEnd = getById("road-closed").getBoundingClientRect().left + 50;
    const roadStart = getById("road-cones").getBoundingClientRect().right;

    if (
      (direction === 1 && skaterRect.right > roadEnd) ||
      (direction === -1 && skaterRect.left < roadStart)
    ) {
      // Reached the end or the start of the scene.

      return false;
    }
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
      const skaterRect = this.skaterImg.getBoundingClientRect(); // skater's position relative to viewport
      const skaterCenter = (skaterRect.left + skaterRect.right) / 2;
      const billboardRect = this.#animation.image.getBoundingClientRect(); // billboard's position relative to viewport.
      // There is the current animation. "Unmark" the current animation when the scene goes out of the current animation,
      //so the scene can properly handle animation again when comes back.

      if (
        (direction === 1 && billboardRect.right < skaterCenter) ||
        (direction === -1 && billboardRect.left > skaterCenter)
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
    const skaterRect = this.skaterImg.getBoundingClientRect();
    const skaterCenter = (skaterRect.left + skaterRect.right) / 2;
    for (let i = 0; i < this.#animations.length; i++) {
      const animation = this.#animations[i];
      const billboardRect = animation.image.getBoundingClientRect();
      if (
        skaterCenter >= billboardRect.left &&
        skaterCenter <= billboardRect.right
      ) {
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
