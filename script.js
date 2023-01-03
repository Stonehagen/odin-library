/* eslint-disable no-use-before-define */
/* eslint-disable wrap-iife */

class Library {
  Library = [];

  Header = ['Title', 'Author', 'Pages', 'Read'];

  constructor() {
    this.Library = [];
  }

  get tableHeader() {
    return this.Header;
  }

  addBookToLibrary(title, author, pages, read) {
    const newBook = {
      title,
      author,
      pages,
      read: read ? 'yes' : 'no',
    };
    this.Library.push(newBook);
  }

  getTable(table) {
    this.Library.forEach((book, index) => {
      const tableRow = document.createElement('tr');
      Object.keys(book).forEach((key) => {
        if (key === 'read') {
          const readButton = DisplayController.getHtmlTag('button', book[key]);
          EventController.addReadEL(readButton, index, key);
          tableRow.appendChild(readButton);
        } else {
          tableRow.appendChild(DisplayController.getHtmlTag('td', book[key]));
        }
      });
      table.appendChild(tableRow);
    });
  }
}

const newlibrary = new Library();

const HtmlSelector = (function getHtmlSelector() {
  const newBookBtn = document.querySelector('.new-book-button');
  const addBookForm = document.querySelector('.add-book-form');
  const addBookBtn = document.querySelector('.add-book-button');

  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const pagesInput = document.querySelector('#pages');
  const readInput = document.querySelector('#read');

  const table = document.querySelector('.table');

  return {
    newBookBtn,
    addBookForm,
    addBookBtn,
    titleInput,
    authorInput,
    pagesInput,
    readInput,
    table,
  };
})();

const EventController = (function getEventController() {
  const addReadEL = (button, index, key) => {
    button.addEventListener('click', () => {
      // eslint-disable-next-line operator-linebreak
      newlibrary.Library[index][key] =
        newlibrary.Library[index][key] === 'yes' ? 'no' : 'yes';
      DisplayController.displayLibrary();
    });
  };

  const newBookEL = () => {
    HtmlSelector.newBookBtn.addEventListener('click', () => {
      HtmlSelector.newBookBtn.style.display = 'none';
      HtmlSelector.addBookForm.style.display = 'flex';
    });
  };

  const addBookEL = () => {
    HtmlSelector.addBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      HtmlSelector.newBookBtn.style.display = 'block';
      HtmlSelector.addBookForm.style.display = 'none';
      newlibrary.addBookToLibrary(
        HtmlSelector.titleInput.value,
        HtmlSelector.authorInput.value,
        HtmlSelector.pagesInput.value,
        HtmlSelector.readInput.checked,
      );
      DisplayController.displayLibrary();
      DisplayController.clearForm();
    });
  };

  return {
    addReadEL,
    newBookEL,
    addBookEL,
  };
})();

const DisplayController = (function getDisplayController() {
  const clearForm = () => {
    HtmlSelector.titleInput.value = '';
    HtmlSelector.authorInput.value = '';
    HtmlSelector.pagesInput.value = '';
    HtmlSelector.readInput.checked = false;
  };

  const getHtmlTag = (tag, insideHtml) => {
    const headingCol = document.createElement(tag);
    headingCol.classList.add('read-button');
    headingCol.innerHTML = insideHtml;
    return headingCol;
  };

  const getTitleRow = () => {
    const tableRow = document.createElement('tr');
    newlibrary.tableHeader.forEach((header) => {
      tableRow.appendChild(getHtmlTag('th', header));
    });
    return tableRow;
  };

  const wipeTable = () => {
    HtmlSelector.table.innerHTML = '';
    HtmlSelector.table.appendChild(getTitleRow());
  };

  const displayLibrary = () => {
    wipeTable();
    newlibrary.getTable(HtmlSelector.table);
  };

  const initiate = () => {
    EventController.newBookEL();
    EventController.addBookEL();
  };

  return {
    clearForm,
    displayLibrary,
    initiate,
    getHtmlTag,
  };
})();

DisplayController.initiate();
