# Dup

## What's Dup?

Dup is an efficient search engine, made for more basic search applications.

## Interface

![](./assets/dup-interface.png)

## How it works?

```
input.addEventListener("input", () => {
  clearSearchList();
  let formattedInput = input.value;

  if (formattedInput.length != 0) {
    for (let j = 0; j < database.length; j++) {
      let inputLength = formattedInput.length;
      let inputUser = removeDiacritics(getPieceOfString(formattedInput, inputLength));
      let db = removeDiacritics(getPieceOfString(database[j], inputLength));

      if (inputUser === db) {
        createItemTemplate(database[j]);
      }
    }
  }
});

// create the template for the searched item
const createItemTemplate = (val) => {
  let div = document.createElement("div");
  div.className =
    "text-white hover:bg-zinc-700 cursor-pointer transition-colors px-3 py-2";

  let span = document.createElement("span");
  span.innerHTML = val;

  div.appendChild(span);
  searchList.appendChild(div);
};

// get a part of the string using an id
const getPieceOfString = (string, index) => {
  let formattedIndex = index === 0 ? 1 : index;
  return string.split("").splice(0, formattedIndex).join("");
};

// clears the search before appearing new search results
const clearSearchList = () => (searchList.innerHTML = "");

// Removes all diacritics from the word
const removeDiacritics = (val) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
```