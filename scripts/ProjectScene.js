class ProjectScene {
  #state = "stopped";   // moving, stopped, stopping.
  #direction = 1;       // 1 - right, -1 - left.
  #smoothness = [];     // To make moving and stopping smooth. 

  #layers = [
    this.#initLayer("layer-1", 1),
    this.#initLayer("layer-2", 1.1),
    this.#initLayer("layer-3", 1.25),
    this.#initLayer("layer-4", 1.5),
    this.#initLayer("layer-5", 2),
    this.#initLayer("layer-6", 3),
    this.#initLayer("layer-8", 5),
  ]

  #initLayer(id, step) {
    return {
      layer: getById(id),
      step: step,   // px to move in parallax.
      left: 0       // Left position of the layer.
    };
  }

  #moveLayer(layer, smoothFactor) {
    layer.left -= this.#direction * layer.step * smoothFactor;
    layer.layer.style.backgroundPositionX = layer.left + "px";
  }
  
  onInterval() {  
    if (this.#state === "stopped") return;

    const smoothFactor = this.#smoothness.length > 0 ? this.#smoothness.shift() : 1;

    for (const layer of this.#layers) {
      this.#moveLayer(layer, smoothFactor);
    }

    if (this.#state === "stopping" && this.#smoothness.length === 0) {
      this.#state = "stopped";
    }
  }

  moveRight() {
    this.#state = "moving";
    this.#direction = 1;
    this.#smoothness = this.#getMovingSmoothness();
  }

  moveLeft() {
    this.#state = "moving";
    this.#direction = -1;
    this.#smoothness = this.#getMovingSmoothness();
  }

  stop() {
    this.#state = "stopping";
    this.#smoothness = this.#getStoppingSmoothness();
  }

  moveReverse() {
    this.#direction *= -1;
    this.#smoothness = this.#getReverseSmoothness();
  }

  #getReverseSmoothness() {
    return [
      new Array(10).fill(0.6),
      new Array(10).fill(0.3),
      new Array(10).fill(0.1),
      new Array(10).fill(0.3),
      new Array(10).fill(0.6),
      new Array(10).fill(0.8),
    ].flat();
  }

  #getStoppingSmoothness() {
    return [
      new Array(10).fill(0.6),
      new Array(10).fill(0.3),
    ].flat();
  }

  #getMovingSmoothness() {
    return [
      new Array(20).fill(0),
      new Array(20).fill(0.1),
      new Array(20).fill(0.2),
      new Array(20).fill(0.4),
      new Array(20).fill(0.6),
      new Array(20).fill(0.8),
    ].flat();
  }
}