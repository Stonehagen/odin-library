const newBookBtn = document.querySelector('.new-book-button');
const addBookForm = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('.add-book-button');

newBookBtn.addEventListener('click', () => {
  newBookBtn.style.display = 'none';
  addBookForm.style.display = 'flex';
});

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newBookBtn.style.display = 'block';
  addBookForm.style.display = 'none';
});
