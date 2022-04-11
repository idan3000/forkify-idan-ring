class searchView {
  _parentElement = document.querySelector(`.search`);

  getQuery() {
    const query = this._parentElement.querySelector(`.search__field`).value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentElement.querySelector(`.search__field`).value = ``;
  }

  addHandlerSearch(handler) {
    this._parentElement.querySelector(`.btn`).addEventListener(`click`, e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
