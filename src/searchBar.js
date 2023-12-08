import { database } from "./database.js";

let input = document.getElementById("input");
let searchList = document.querySelector(".search-list");

input.addEventListener("input", () => {
  clearSearchList();
  let formattedInput = removeSpaces(input.value)

  if (formattedInput.length != 0) {

    for (let j = 0; j < database.length; j++) {

      let inputLength = formattedInput.length;
      
      // takes a part of each string to compare
      let inputUser = removeDiacritics(getPieceOfString(formattedInput, inputLength));
      let db = removeDiacritics(getPieceOfString(database[j], inputLength));

      if (inputUser === db) {
        // if the user value is in the db it will be displayed
        createItemTemplate(database[j]);
      }
    }
  }
});

const createItemTemplate = (val) => {
  let div = document.createElement("div");
  div.className =
    "text-white hover:bg-zinc-700 cursor-pointer transition-colors px-3 py-2";

  let span = document.createElement("span");
  span.innerHTML = val;

  div.appendChild(span);
  searchList.appendChild(div);
};

const clearSearchList = () => (searchList.innerHTML = "");

const getPieceOfString = (string, index) => {
  let formattedIndex = index === 0 ? 1 : index;
  return string.split("").splice(0, formattedIndex).join("");
};

const removeDiacritics = (val) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const removeSpaces = (val) => val.split(' ').join('')