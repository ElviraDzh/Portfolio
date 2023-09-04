class Menu {
  constructor() {
    getById("btn-about").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.#showAboutScene();
    });

    getById("btn-projects").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.#showProjectsScene();
    });
  }

  #showAboutScene() {
    SCENE_WRAPPER.down();
    ABOUT_SCENE.show(true);
    PROJECTS_SCENE.show(false);
    SKATER.setImage("about-skater");
    CURRENT_SCENE = ABOUT_SCENE;
  }

  #showProjectsScene() {
    SCENE_WRAPPER.down();
    ABOUT_SCENE.show(false);
    PROJECTS_SCENE.show(true);
    SKATER.setImage("projects-skater");
    CURRENT_SCENE = PROJECTS_SCENE;
  }

  #showWhiteNoise() {
    const tv = document.querySelector(".tv-set");
    const whiteNoise = getById("white-noise");
    const tvStyle = getComputedStyle(tv);
    if (tvStyle.backgroundImage === "none") return;

    whiteNoise.style.display = "block";
    setTimeout(() => {
      whiteNoise.style.display = "none";
    }, 750);
  }
}
