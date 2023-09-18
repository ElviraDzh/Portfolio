class TouchHandler {
  constructor() {
    const container = getById("container");
    const overlayBillboard = getById("overlay-billboard");
    const hammerContainer = new Hammer(container);
    const hammerBillboard = new Hammer(overlayBillboard);

    hammerContainer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    hammerContainer.on("swipeleft", function () {
      SCENE_WRAPPER.moveLeft();
    });

    hammerContainer.on("swiperight", function () {
      SCENE_WRAPPER.moveRight();
    });

    hammerContainer.on("swipeup", function () {
      SCENE_WRAPPER.up();
    });

    hammerContainer.on("swipedown", function () {
      SCENE_WRAPPER.down();
    });

    hammerBillboard.on("tap", function () {
      showModalBox();
    });
  }
}
