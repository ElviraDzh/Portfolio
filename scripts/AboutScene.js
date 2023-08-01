class AboutScene {
  #center = SCREEN.centerX;
  #speed = 1;
  #animation = null;

  #start = SCREEN.centerX;
  #end = 3430;
  #animations = [
    {
      start: 390,
      end: 500,
      image: getById("about-billboard-1-arrow"),
    },
    {
      start: 700,
      end: 1120,
      image: getById("about-billboard-2-girl"),
    },
    {
      start: 1650,
      end: 2350,
      image: getById("about-billboard-2-girl"),
    },
    {
      start: 2610,
      end: 3230,
      image: getById("about-billboard-4"),
    },
  ];

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
    console.log(this.#center);
    return true;
  }

  // Returns true if the scene can move in a given direction. Otherwise, false.
  // For example, reaching the end of scene.
  move(direction, smoothFactor) {
    if (!this.canMove(direction)) return false;

    this.#center += direction * this.#speed;
    this.#handleAnimations(direction);

    // Move layers.
    for (const layer of this.#layers) {
      layer.left -= direction * layer.step * smoothFactor;
      if (layer.moveBackground)
        layer.layer.style.backgroundPositionX = layer.left + "px";
      else layer.layer.style.left = layer.left + "px";
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
