const newBookBtn = document.querySelector('.new-book-button');
const addBookForm = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('.add-book-button');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const table = document.querySelector('.table');

const myLibrary = [];

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
    readInput.value,
  );
  myLibrary.push(newBook);
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    const tableRow = document.createElement('tr');
    Object.keys(book).forEach((key) => {
      const tableCol = document.createElement('td');
      tableCol.textContent = book[key];
      tableRow.appendChild(tableCol);
    });
    table.appendChild(tableRow);
  });
}

function clearForm() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readInput.value = '';
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
