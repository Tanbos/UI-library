"use strict";

const configTable = {
  parent: '#usersTable',   //
  columns: [{title: '№', value: '_index'},
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname', sortable: true},
    {title: 'Возраст', value: 'age', type: 'number', sortable: true},],
  search: {
    // fields: ['name', 'surname'],
    filters: [
      v => v.toLowerCase(), // это лямбда-функция, не бойтесь :)
      v => toKeyboardLayoutRu(v), //функция, которая для каждой английской буквы находит на клавиатуре русский аналог и возвращает "переведённую" строку. полезно, если человек начал печатать, забыв перед этим переключить раскладку
      v => toKeyboardLayoutRu(v.toLowerCase()),// предыдущая функция без учета регистра
      // v => toKeyboardLayout(v, 'en') // то же самое, но ищет английские соответствия для русских букв
    ] // а это был массив функций :))
  }
};

const users = [{id: 30050, name: 'Вася', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
  {id: 30052, name: 'D', surname: 'Аасечкин', age: 1},
  {id: 30053, name: 'Ds', surname: 'Яасечкин', age: 5},];

function DataTable(config, data) {
  /* statusArray for change sort buttons (buttons from src="https://kit.fontawesome.com/14fb9e47fb.js") */
  const statusArray = [{"unsort": "fas fa-sort", "sortUp": "fas fa-sort-up", "sortDown": "fas fa-sort-down"},
    {"fas fa-sort": "unsort", "fas fa-sort-up": "sortUp", "fas fa-sort-down": "sortDown"}];

  let data1 = data.slice(0);
  let status = "unsort";
  if (config.search) {
    createFieldSearch();
  }

  let table = createTable();
  let thead = createTableHeader();
  renderTable(data1);    // show start (unsort) table
  createSortButtons(table);


  /* return current status of class button */
  function currentStatusButton(button) {
    return statusArray[1][button.getAttribute("class")];
  }

  /*return new status after click button. Status = { unsort, sortUp, sortDown }*/
  function changeStatus(status) {
    switch (status) {
      case "unsort":
        return "sortUp";
      case "sortUp":
        return "sortDown";
      case "sortDown":
        return "unsort";
    }
  }

  function changeButtonStatus(button, newStatus) {
    button.setAttribute("class", newStatus);
  }

  function restartButtonsStatus() {
    let buttons = thead.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      changeButtonStatus(buttons[i], statusArray[0]["unsort"]);
    }
  }

  /* render and show body of table */
  function renderTable(arrayUsers) {
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let numberUser = 0;
    for (let i = 0; i < arrayUsers.length; i++) {
      numberUser++;
      let trTbody = document.createElement("tr");
      let td = document.createElement("td");
      let text = document.createTextNode(numberUser);  // don't sort
      td.appendChild(text);
      trTbody.appendChild(td);
      for (let j = 1; j < config.columns.length; j++) {
        let key = config.columns[j].value;
        let td = document.createElement("td");
        let text = document.createTextNode(arrayUsers[i][key]);
        if (config.columns[j].type === "number") {
          td.setAttribute("class", "align-right");
        }
        td.appendChild(text);
        trTbody.appendChild(td);
      }
      tbody.appendChild(trTbody);
    }
  }

  function removeBodyTable() {
    document.querySelector("tbody").remove();
  }

  function sortArray(arrayUsers, statusSort, column) {
    if (statusSort === "unsort") {
      return arrayUsers;
    }
    let koef = 1;
    if (statusSort === "sortDown") {
      koef = -1;
    }
    if (column.type === "number") {
      sortArrayNumber(koef, column.value);
    } else {
      sortArrayText(koef, column.value);
    }

    function sortArrayNumber(koef, column) {
      arrayUsers.sort(function (a, b) {
        return koef * (a[column] - b[column])
      });
    }

    function sortArrayText(koef, column) {
      arrayUsers.sort(function (a, b) {
        return koef * a[column].localeCompare(b[column]);
      });
    }
    return arrayUsers;
  }

  function addSearch(event) {
    let searchKey = event.target.value;
    if (searchKey === "") {
      data1 = data.slice(0);
    } else {
      data1 = searchForKey(data.slice(0), searchKey);
    }
    removeBodyTable();
    restartButtonsStatus();
    renderTable(data1);
  }

  function searchForKey(array, key) {
    let resultArchiv = [];
    continue1: for (let i = 0; i < array.length; i++) {
      const searchValues = [];
      if (config.search.fields) {
        for (let l = 0; l < config.search.fields.length; l++) {
          searchValues.push(array[i][config.search.fields[l]]);  // массив формируется из тех значений полей, которые указаны в config.fields
        }
      } else {
        for (let l = 1; l < config.columns.length; l++) {
          searchValues.push(array[i][config.columns[l].value]);  // массив по всем полям
        }
      }

      for (let j = 0; j < searchValues.length; j++) {
        if (searchValues[j] == key) {
          resultArchiv.push(array[i]);
          continue continue1;
        } else {
          if (config.search.filters) {
            for (let k = 0; k < config.search.filters.length; k++) {
              if ((searchValues[j] == key) ||
                (isNaN(searchValues[j]) &&
                  (config.search.filters[k](searchValues[j]) === config.search.filters[k](key)))) {
                resultArchiv.push(array[i]);
                continue continue1;
              }
            }
          }
        }
      }
    }
    return resultArchiv;
  }

  function createTable() {
    let table = document.createElement("table");
    document.querySelector(config.parent).appendChild(table);
    return table;
  }

  function createTableHeader() {
    let thead = document.createElement("thead");
    table.appendChild(thead);
    let trThead = document.createElement("tr");
    for (let j = 0; j < config.columns.length; j++) {
      let th = document.createElement("th");
      let text = document.createTextNode(config.columns[j].title);
      if (config.columns[j].type === "number") {  //
        th.setAttribute("class", "align-right");
      }
      th.appendChild(text);
      trThead.appendChild(th);
    }
    thead.appendChild(trThead);
    return thead;
  }

  function createFieldSearch() {
    let div = document.createElement("div");
    div.setAttribute("class", "table-search");
    let search = document.createElement("input");
    search.type = "text";
    search.placeholder = "Search (add filter)";
    div.appendChild(search);
    document.querySelector(config.parent).appendChild(div);
    search.oninput = addSearch;
  }

  function createSortButtons(table) {
    for (let j = 0; j < config.columns.length; j++) {
      let th = table.getElementsByTagName("th");
      if (config.columns[j].sortable === true) { /*  search cells and add buttons, when sortable=true */
        let button = document.createElement("button");
        button.setAttribute("class", "fas fa-sort");
        th[j].appendChild(button);

        button.onclick = function () {
          let newStatus = changeStatus(currentStatusButton(button));
          restartButtonsStatus();
          changeButtonStatus(button, statusArray[0][newStatus]);
          status = newStatus;
          let newArray = sortArray(data1.slice(0), status, config.columns[j]);
          removeBodyTable();
          renderTable(newArray);
        };
      }
    }
  }
}

function toKeyboardLayoutRu(str) {
  let associativeArray = {
    "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
    "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
    "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
    ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
    "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
  };
  return str.replace(/[A-z/,.;\'\]\[]/g, function (x) {
    return x == x.toLowerCase() ? associativeArray[x] : associativeArray[x.toLowerCase()].toUpperCase();
  });
}

DataTable(configTable, users);

