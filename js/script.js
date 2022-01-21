document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  const search = document.getElementById("searchBookTitle");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToShelf();
  });

  search.addEventListener("keyup", function (event) {
    event.preventDefault();
    searchBookTitle();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshData();
});
