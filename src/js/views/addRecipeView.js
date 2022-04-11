import view from './view';

class addRecipeView extends view {
  _parentElement = document.querySelector(`.upload`);
  _okMessage = `recipe uploaded successfully`;
  _header = document.querySelector(`.header`);
  _overlay = document.querySelector(`.overlay`);
  _Window = document.querySelector(`.add-recipe-window`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClosed = document.querySelector(`.btn--close-modal`);
  _btnUpload = document.querySelector(`.upload__btn`);

  constructor() {
    super();
    this._addHandlerShow();
    this._addHandlerHide();
  }

  _addHandlerShow() {
    this._btnOpen.addEventListener(`click`, this.toggleWind.bind(this));
  }

  _addHandlerHide() {
    this._btnClosed.addEventListener(`click`, this.toggleWind.bind(this));
    this._overlay.addEventListener(`click`, this.toggleWind.bind(this));
  }

  addHandlerUplode(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  toggleWind() {
    this._overlay.classList.toggle(`hidden`);
    this._Window.classList.toggle(`hidden`);
  }
}

export default new addRecipeView();
