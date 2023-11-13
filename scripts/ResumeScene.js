class ResumeScene {
  #sceneSection = getById("resume-scene");

  show(visible) {
    this.#sceneSection.style.display = visible ? "flex" : "none";
  }
}
