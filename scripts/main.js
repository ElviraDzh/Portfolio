const timer = new Timer();
timer.start();

const scene = new ProjectScene();
timer.setScene(scene);

const skater = new Skater(scene);
const keyHandler = new KeyHandler(skater);