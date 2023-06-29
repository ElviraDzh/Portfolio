class Skater {
  #image = byId("skater");

  jump() {
    this.#image.src = "./images/skater/jump.gif";
    //setTimeout(this._setIdle, 840);
  }
}