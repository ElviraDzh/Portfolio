const SCREEN = new Screen();
const KEY_HANDLER = new KeyHandler();

const SKATER = new Skater();
SKATER.setImage("about-skater");
//SKATER.setImage("projects-skater");
//const CURRENT_SCENE = new ProjectScene();
const CURRENT_SCENE = new AboutScene();
const SCENE_WRAPPER = new SceneWrapper();

const TIMER = new Timer();
TIMER.start();
