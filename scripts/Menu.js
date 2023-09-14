class Menu {
  constructor() {
    getById("about-me-btn").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.showAboutScene();
      document.querySelector(".tv-set").style.backgroundImage =
        "url(../images/general/tv-set-about-me.png)";
    });

    getById("projects-btn").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.showProjectsScene();
      document.querySelector(".tv-set").style.backgroundImage =
        "url(../images/general/tv-set-projects.png)";
    });

    getById("resume-btn").addEventListener("click", () => {
      document.querySelector(".tv-set").style.backgroundImage =
        "url(../images/general/tv-set-resume.png)";
    });
  }

  showAboutScene() {
    SCENE_WRAPPER.down();
    ABOUT_SCENE.show(true);
    PROJECTS_SCENE.show(false);
    SKATER.setImage("about-skater");
    CURRENT_SCENE = ABOUT_SCENE;
  }

  showProjectsScene() {
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
