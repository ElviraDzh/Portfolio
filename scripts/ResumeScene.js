class ResumeScene {
  #sceneSection = getById("resume-scene");

  show(visible) {
    this.#sceneSection.style.display = visible ? "block" : "none";
  }
}
