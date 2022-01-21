const UNFINISHED_BOOKSHELF_LIST = "unfinishedBookshelfList";
const FINISHED_BOOKSHELF_LIST = "finishedBookshelfList";
const BOOK_ID = "bookId";

function createBook(title, author, year, isFinished) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const card = document.createElement("div");
  card.classList.add("card");
  card.append(textTitle, textAuthor, bookYear);

  if (isFinished) {
    card.append(createUndoButton(), createTrashButton());
  } else {
    card.append(createCheckButton());
  }

  return card;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function createCheckButton() {
  return createButton("button-check", function (e) {
    addBookToFinished(e.target.parentElement);
  });
}
function createTrashButton() {
  return createButton("button-trash", function (e) {
    removeTaskFromFinished(e.target.parentElement);
  });
}
function createUndoButton() {
  return createButton("button-undo", function (e) {
    undoBookFromFinished(e.target.parentElement);
  });
}

function addBookToShelf() {
  const unfinishedBookshelfList = document.getElementById(
    UNFINISHED_BOOKSHELF_LIST
  );
  const finishedBookshelfList = document.getElementById(
    FINISHED_BOOKSHELF_LIST
  );
  const textTitle = document.getElementById("inputBookTitle").value;
  const textAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const checkFinished = document.querySelector("#inputBookIsComplete").checked;

  const book = createBook(textTitle, textAuthor, bookYear, checkFinished);
  const bookObject = composebookObject(
    textTitle,
    textAuthor,
    bookYear,
    checkFinished
  );

  book[BOOK_ID] = bookObject.id;
  books.push(bookObject);
  if (checkFinished == true) {
    finishedBookshelfList.append(book);
  } else {
    unfinishedBookshelfList.append(book);
  }
  updateDataToStorage();
}

function addBookToFinished(bookElement) {
  const finishedBookshelfList = document.getElementById(
    FINISHED_BOOKSHELF_LIST
  );
  const textTitle = document.querySelector(".card > h3").innerText;
  const textAuthor = document.querySelector(
    ".card > p:nth-of-type(1)"
  ).innerText;
  const bookYear = document.querySelector(".card > p:nth-of-type(2)").innerText;

  const finishedBook = createBook(textTitle, textAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ID]);
  book.isFinished = true;
  finishedBook[BOOK_ID] = book.id;

  finishedBookshelfList.append(finishedBook);
  bookElement.remove();

  updateDataToStorage();
  location.reload(true);
}

function removeTaskFromFinished(bookElement) {
  if (confirm("Are you sure to delete it?") == true) {
    const bookIndex = findbookIndex(bookElement[BOOK_ID]);
    books.splice(bookIndex, 1);

    bookElement.remove();
    updateDataToStorage();
  } else {
    return false;
  }
}

function undoBookFromFinished(bookElement) {
  const unfinishedBookshelfList = document.getElementById(
    UNFINISHED_BOOKSHELF_LIST
  );
  const textTitle = document.querySelector(".card > h3").innerText;
  const textAuthor = document.querySelector(
    ".card > p:nth-of-type(1)"
  ).innerText;
  const bookYear = document.querySelector(".card > p:nth-of-type(2)").innerText;

  const unfinishedbook = createBook(textTitle, textAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ID]);
  book.isFinished = false;
  unfinishedbook[BOOK_ID] = book.id;

  unfinishedBookshelfList.append(unfinishedbook);
  bookElement.remove();

  updateDataToStorage();
  location.reload(true);
}

function refreshData() {
  const unfinishedBookshelfList = document.getElementById(
    UNFINISHED_BOOKSHELF_LIST
  );
  const finishedBookshelfList = document.getElementById(
    FINISHED_BOOKSHELF_LIST
  );
  for (book of books) {
    const newBook = createBook(
      book.title,
      book.author,
      book.year,
      book.isFinished
    );
    newBook[BOOK_ID] = book.id;

    if (book.isFinished) {
      finishedBookshelfList.append(newBook);
    } else {
      unfinishedBookshelfList.append(newBook);
    }
  }
}

function searchBookTitle() {
  const search = document.getElementById("searchBookTitle");
  const filter = search.value.toUpperCase();
  const card = document.getElementsByClassName("card");

  for (let i = 0; i < card.length; i++) {
    const bookTitle = card[i].getElementsByTagName("h3")[0];
    const textTitle = bookTitle.innerText;
    if (textTitle.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}
