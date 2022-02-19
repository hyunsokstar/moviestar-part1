class Favorite {
  constructor() {
    this.FavoriteElement = document.querySelector(".content-favorite");
  }

  setup() {
    this.bindEvents();
  }

  bindEvents() {
    this.FavoriteElement.addEventListener("click", (event) => {
      console.log(event.composedPath());
      const cPath = event.composedPath();
      const element = cPath.find((element) => element.tagName === "BUTTON");

      if (!element) {
        return;
      }

      element.classList.toggle("on");
    });
  }
}

export default Favorite;
