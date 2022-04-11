import view from './view';
import icons from 'url:../../img/icons.svg';

export default class preview extends view {
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreviw).join(``);
  }

  _generateMarkupPreviw(recipe) {
    const linkActive =
      window.location.hash.slice(1) === recipe.id
        ? `preview__link--active`
        : ``;

    return `<li class="preview">
          <a class="preview__link ${linkActive}" href="#${recipe.id}">
              <figure class="preview__fig">
                  <img src="${recipe.image}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">   
                  <h4 class="preview__title">${recipe.title}</h4>
                  <p class="preview__publisher">${recipe.publisher} Woman</p>
                  <div class="preview__user-generated ${
                    recipe.key ? `` : `hidden`
                  }">
                  <svg>
                  <use href="${icons}#icon-user"></use>
                  </svg>
                  </div>
              </div>
          </a>
      </li> `;
  }
}
/*
<li class="preview">
            <a class="preview__link preview__link--active" href="#23456">
              <figure class="preview__fig">
                <img src="src/img/test-1.jpg" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
                <div class="preview__user-generated">
                  <svg>
                    <use hre="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
*/
