import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import { async } from 'regenerator-runtime/runtime';
import 'core-js/stable';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return recipeView.renderMassage();
    recipeView.renderSpinner();
    await model.lodeRecipe(id);
    recipeView.render(model.state.recipe);
    bookMarkView.render(model.state.bookMarks);
    resultsView.update(model.getSearchResultsPage());
  } catch (err) {
    // alert(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlPage = newPage => {
  model.state.search.page = newPage;
  paginationView.render(model.state.search);
  resultsView.render(model.getSearchResultsPage());
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    query = searchView.getQuery();
    if (!query) return;
    await model.lodeSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const controlBookMark = () => {
  model.BookMark();
  recipeView.update(model.state.recipe);
  bookMarkView.render(model.state.bookMarks);
};

const controlServing = newServing => {
  model.ingrQuantity(newServing);
  recipeView.update(model.state.recipe);
};
const controlBookMarkLode = () => {
  model.bookMarkLode();
  bookMarkView.render(model.state.bookMarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    addRecipeView.renderMassage();
    console.log(MODAL_CLOSE_SEC);
    setTimeout(() => addRecipeView.toggleWind(), MODAL_CLOSE_SEC);
    window.location.hash = `#${model.state.recipe.id}`;
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err);
  }
};
const init = () => {
  bookMarkView.addHandlerRender(controlBookMarkLode, [`load`]);
  recipeView.addHandlerRender(controlRecipe, [`hashchange`, `load`]);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerServingsBtn(controlServing);
  paginationView.addHandlerPageBTN(controlPage);
  recipeView.addHandlerBookMark(controlBookMark);
  addRecipeView.addHandlerUplode(controlAddRecipe);
};
init();
//http://localhost:1234/#5ed6604591c37cdc054bc90b
