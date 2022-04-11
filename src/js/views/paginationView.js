import view from './view';
import icons from 'url:../../img/icons.svg';
import { RESULTS_TO_PAGE } from '../config.js';

class paginationView extends view {
  _parentElement = document.querySelector(`.pagination`);

  _generateMarkup(data = this._data) {
    const maxPage = data.results.length / RESULTS_TO_PAGE;
    const markupPreviw = [];
    if (maxPage <= 1) return ``;
    if (data.page < maxPage)
      markupPreviw.push(this._generateNextBtn(data.page));
    if (data.page >= 2) markupPreviw.push(this._generatePrevBtn(data.page));
    return markupPreviw.join(``);
  }

  _generateBtn(btnClass, btnIcon, page) {
    return `
        <button class="btn--inline pagination__btn--${btnClass}">
                <svg class="search__icon">
                   <use href="${icons}#icon-arrow-${btnIcon}"></use>
                </svg>
            <span>Page ${page}</span>
        </button>
        `;
  }

  _generateNextBtn(page) {
    return this._generateBtn(`next`, `right`, page + 1);
  }
  _generatePrevBtn(page) {
    return this._generateBtn(`prev`, `left`, page - 1);
  }

  addHandlerPageBTN(handler) {
    this._parentElement.addEventListener(`click`, e => {
      const btn = e.target.closest(`.btn--inline`);
      if (!btn) return;
      handler(+btn.innerText.slice(-1));
    });
  }
}
export default new paginationView();
