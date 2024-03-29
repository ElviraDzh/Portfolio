class TouchHandler {
  constructor() {
    const container = getById("container");
    const hammerContainer = new Hammer(container);
    const hammerBillboard = new Hammer(overlayBillboard);
    const parentOfBillboards = getById("projects-billboards");
    const hammerParentBillboards = new Hammer(parentOfBillboards);

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

    hammerParentBillboards.on("tap", (e)=>{
      if(e.target.classList.contains("projects-billboards-styles")){
       showModalBox();
      }
   })

  }
}
