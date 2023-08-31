const SCREEN = new Screen();
const KEY_HANDLER = new KeyHandler();

const SKATER = new Skater();
SKATER.setImage("about-skater");
const PROJECTS_SCENE = new ProjectsScene();
const ABOUT_SCENE = new AboutScene();
let CURRENT_SCENE = ABOUT_SCENE;
const SCENE_WRAPPER = new SceneWrapper();

const TIMER = new Timer();
TIMER.start();

const MENU = new Menu();
MENU.init();
