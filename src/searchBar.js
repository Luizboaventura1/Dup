import { database } from "./database.js";

let input = document.getElementById("input");
let searchList = document.querySelector(".search-list");

input.addEventListener("input", () => {
  search(input.value, database);
});

const search = (input, db) => {
  clearSearchList();

  if (input.trim()) {
    db.forEach((item) => {
      let regex = new RegExp(removeDiacritics(input));

      if (regex.test(removeDiacritics(item))) {
        createItemTemplate(item);
      }
    });
  }
};

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

const removeDiacritics = (val) => {
  return val
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};