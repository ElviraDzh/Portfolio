class Menu {
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

  init() {
    getById("btn-about").addEventListener("click", () => {
      this.#showAboutScene();
    });
    getById("btn-projects").addEventListener("click", () => {
      this.#showProjectsScene();
    });
  }
}
