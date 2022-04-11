import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_TO_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
    page: 1,
  },
  bookMarks: [],
};

const createRecipeObject = data => {
  const { recipe } = data.data;

  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const lodeRecipe = async id => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(data);
    if (state.bookMarks.some(mark => mark.id === state.recipe.id))
      return (state.recipe.bookMark = true);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const lodeSearchResults = async query => {
  try {
    state.search.query = query;
    const { data } = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) =>
  state.search.results.slice(
    (page - 1) * RESULTS_TO_PAGE,
    page * RESULTS_TO_PAGE
  );

export const ingrQuantity = newServing => {
  state.recipe.ingredients.forEach(ing => {
    if (!ing.quantity) return ``;
    ing.quantity = (ing.quantity / state.recipe.servings) * newServing;
  });
  state.recipe.servings = newServing;
};
export const BookMark = () => {
  state.recipe.bookMark !== true ? bookMarkAdd() : bookMarkRemove();
  bookMarkStore();
};

const bookMarkAdd = () => {
  state.bookMarks.push(state.recipe);
  state.recipe.bookMark = true;
};
const bookMarkRemove = () => {
  state.bookMarks = state.bookMarks.filter(mark => mark.id !== state.recipe.id);
  state.recipe.bookMark = false;
};

const bookMarkStore = () =>
  localStorage.setItem(`bookMark`, JSON.stringify(state.bookMarks));

export const bookMarkLode = () => {
  if (localStorage.getItem(`bookMark`))
    state.bookMarks = JSON.parse(localStorage.getItem(`bookMark`));
};

const clearBookMarks = () => {
  localStorage.clear(`bookMark`);
};
// clearBookMarks();

export const uploadRecipe = async newRecipe => {
  try {
    const ingredients = await newIngredient(Object.entries(newRecipe));
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);

    BookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const newIngredient = async newRecipe => {
  try {
    return newRecipe
      .filter(ent => ent[0].startsWith(`ingredient`) && ent[1])
      .map(ent => {
        const ingArr = ent[1].split(`,`).map(x => x.trim());
        if (ingArr.length !== 3)
          throw new Error(`wong ingredient format at  ${ent[0]}`);
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      })
      .filter(x => x);
  } catch (err) {
    throw err;
  }
};
