const timer = new Timer();
timer.start();

const scene = new ProjectScene();
timer.setScene(scene);

const skater = new Skater(scene);
const keyHandler = new KeyHandler(skater);
//const skater = new Skater();
//const keyHandler = new KeyHandler(skater);

function moveLayer(layerId, step) {
  const layer = getById(layerId);
  const currentPosition = parseInt(getComputedStyle(layer).backgroundPositionX);
  layer.style.backgroundPositionX = currentPosition - step + "px";
}

function onInterval() {
  moveLayer("layer-1", 2);
  moveLayer("layer-2", 4);
  moveLayer("layer-3", 6);
  moveLayer("layer-4", 8);
  moveLayer("layer-5", 10);
  moveLayer("layer-6", 12);
  moveLayer("layer-8", 14);
}

setInterval(onInterval, 30);
