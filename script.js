const newBookBtn = document.querySelector('.new-book-button');
const addBookForm = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('.add-book-button');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const table = document.querySelector('.table');

const myLibrary = [];

const tableHeader = ['Title', 'Author', 'Pages', 'Read'];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked ? 'yes' : 'no',
  );
  myLibrary.push(newBook);
}

function getHtmlTag(tag, insideHtml) {
  const headingCol = document.createElement(tag);
  headingCol.classList.add('read-button');
  headingCol.innerHTML = insideHtml;
  return headingCol;
}

function getTitleRow() {
  const tableRow = document.createElement('tr');
  tableHeader.forEach((header) => {
    tableRow.appendChild(getHtmlTag('th', header));
  });
  return tableRow;
}

function wipeTable() {
  table.innerHTML = '';
  table.appendChild(getTitleRow());
}

function displayLibrary() {
  wipeTable();
  myLibrary.forEach((book, index) => {
    const tableRow = document.createElement('tr');
    Object.keys(book).forEach((key) => {
      if (key === 'read') {
        const readButton = getHtmlTag('button', book[key]);
        readButton.addEventListener('click', () => {
          // eslint-disable-next-line operator-linebreak
          myLibrary[index][key] =
            myLibrary[index][key] === 'yes' ? 'no' : 'yes';
          return displayLibrary();
        });
        tableRow.appendChild(readButton);
      } else {
        tableRow.appendChild(getHtmlTag('td', book[key]));
      }
    });
    table.appendChild(tableRow);
  });
}

function clearForm() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.checked = false;
}

newBookBtn.addEventListener('click', () => {
  newBookBtn.style.display = 'none';
  addBookForm.style.display = 'flex';
});

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newBookBtn.style.display = 'block';
  addBookForm.style.display = 'none';
  addBookToLibrary();
  displayLibrary();
  clearForm();
});
