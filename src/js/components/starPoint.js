const starImageSourceMap = {
  empty: "../../src/assets/images/icon_empty_star.png",
  half: "../../src/assets/images/icon_half_star.png",
  full: "../../src/assets/images/icon_star.png",
};

class StarPoint {
  constructor() {
    this.starContentElement = document.querySelector(".content-star");
    this.starBackgroundElement =
      this.starContentElement.querySelector(".star-background");
    this.starimages = this.starBackgroundElement.querySelectorAll("img");
    this.starPointResetButton =
      this.starContentElement.querySelector(".icon-remove-star");
    this.lockedStarPoint = false;
  }

  setup() {
    this.bindEvents();
  }

  lockStarPoint() {
    this.lockedStarPoint = true;
  }

  unlockStarPoint() {
    this.lockedStarPoint = false;
  }

  isLockedStarPoint() {
    // console.log("hellow starpoint");
    return this.lockedStarPoint;
  }

  bindEvents() {
    console.log("hello starpoint");
    this.starBackgroundElement.addEventListener("mousemove", (event) => {
      if (this.isLockedStarPoint()) {
        return;
      }

      // target: event.target , offsetX: .star-background 내부의 X 좌표
      const { target, offsetX: currentUserPoint } = event;
      // console.log("currentUsePoint : ", currentUserPoint);
      // console.log(target.getClientRects()); // target 의 위치와 넓이 등
      const { point } = target.dataset;
      const starPointIndex = parseInt(point, 10) - 1;

      const [starimageClientRect] = target.getClientRects();

      const starImageWidth = starimageClientRect.width;

      // 각 별에서 반 이전에서 움직이면 false 넘은곳에서 움직이면 true
      const isOverHalf = starImageWidth / 2 < currentUserPoint;
      // console.log(isOverHalf);

      this.renderStarPointImages({
        drawableLimitIndex: starPointIndex,
        isOverHalf,
      });

      this.starBackgroundElement.addEventListener("click", () =>
        this.lockStarPoint()
      );

      this.starPointResetButton.addEventListener("click", () => {
        this.unlockStarPoint();
        this.resetStarPointImages();
      });

      this.starBackgroundElement.addEventListener('mouseout',()=> {
        !this.isLockedStarPoint() && this.resetStarPointImages();
      })

    });
  }

  renderStarPointImages(payload = {}) {
    const { drawableLimitIndex = -1, isOverHalf = false } = payload;

    // 현재 호버한 별의 index
    console.log("drawableLimitIndex : ", drawableLimitIndex);

    // 별 위에서 마우스 움직이면 this.starimages 반복문 돌려서 각각 starimage 로 넘김
    Array.prototype.forEach.call(this.starimages, (starimage, index) => {
      // console.log("starimage : ", starimage);

      let imageSource =
        index < drawableLimitIndex
          ? starImageSourceMap.full
          : starImageSourceMap.empty;

      if (drawableLimitIndex === index) {
        imageSource = isOverHalf
          ? starImageSourceMap.full
          : starImageSourceMap.half;
      }

      starimage.src = imageSource;
    });
  }

  resetStarPointImages() {
    this.renderStarPointImages();
  }
}
export default StarPoint;
