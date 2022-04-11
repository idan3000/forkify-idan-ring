import icons from 'url:../../img/icons.svg';

export default class view {
  _data;

  /**
   *render object to the DOM
   * @param {object | object[]} data
   * @returns
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  update(data) {
    if (!data) return;

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll(`*`));
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.innerText = newEl.innerText;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  }
  renderSpinner() {
    const html = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
       </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, html);
  }

  renderError(err = this._erorMessage) {
    this._clear();
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${err}</p>
    </div>`;
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
  renderMassage(message = this._okMessage) {
    const markup = `
    <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  addHandlerRender(handler, arr) {
    arr.forEach(evant => window.addEventListener(evant, handler));
  }
}
