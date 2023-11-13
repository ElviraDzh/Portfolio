class Menu {
  constructor() {
    getById("about-me-btn").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.showAboutScene();
      document.querySelector(".switch-buttons").style.backgroundImage =
        "url(images/general/menu-about-me.png)";
    });

    getById("projects-btn").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.showProjectsScene();
      document.querySelector(".switch-buttons").style.backgroundImage =
        "url(images/general/menu-projects.png)";
    });

    getById("resume-btn").addEventListener("click", () => {
      this.#showWhiteNoise();
      this.showResumeScene();
      document.querySelector(".switch-buttons").style.backgroundImage =
        "url(images/general/menu-resume.png)";
      document.getElementById("overlay-resume").style.display = "block";
    });
  }

  showAboutScene() {
    SCENE_WRAPPER.down();
    ABOUT_SCENE.show(true);
    PROJECTS_SCENE.show(false);
    RESUME_SCENE.show(false);
    SKATER.setImage("about-skater");
    CURRENT_SCENE = ABOUT_SCENE;
  }

  showProjectsScene() {
    SCENE_WRAPPER.down();
    ABOUT_SCENE.show(false);
    PROJECTS_SCENE.show(true);
    RESUME_SCENE.show(false);
    SKATER.setImage("projects-skater");
    CURRENT_SCENE = PROJECTS_SCENE;
  }

  showResumeScene() {
    ABOUT_SCENE.show(false);
    PROJECTS_SCENE.show(false);
    RESUME_SCENE.show(true);
    CURRENT_SCENE = RESUME_SCENE;
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
