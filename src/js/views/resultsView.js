import preview from './preview';

class resultsview extends preview {
  _parentElement = document.querySelector(`.results`);
  _erorMessage = `no search results was found please try again`;
  _okMessage = ``;
}

export default new resultsview();
