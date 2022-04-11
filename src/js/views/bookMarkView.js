import preview from './preview';

class bookMarkView extends preview {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _erorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _okMessage = ``;
}

export default new bookMarkView();
