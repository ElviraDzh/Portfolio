const SCREEN = new Screen();
const KEY_HANDLER = new KeyHandler();
const TOUCH_HANDLER = new TouchHandler();

const SKATER = new Skater();
SKATER.setImage("about-skater");
const ABOUT_SCENE = new AboutScene();
let CURRENT_SCENE = ABOUT_SCENE;
const PROJECTS_SCENE = new ProjectsScene();
const RESUME_SCENE = new ResumeScene();
const SCENE_WRAPPER = new SceneWrapper();

const TIMER = new Timer();
TIMER.start();

const MENU = new Menu();
