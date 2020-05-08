"use strict";

const configTable = {
  parent: '#usersTable',
  columns: [{title: '№', value: '_index', editable: false},
    // {title: 'Id', value: 'id', editable: false},
    {title: 'Title', value: 'title', sortable: true},
    //{title: 'Сover', value: 'cover',},
    {title: 'Age, months', value: (x) => calculateAge(x.publishDate), type: 'data'},  // age calculate in months
    {title: 'Price', value: 'price', type: 'number', sortable: true},
    {title: 'Actions', value: 'action', editable: false},
  ],
  apiUrl: 'https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/books',
  search: {
    fields: ['title', 'cover'],
    filters: [
      // если без фильтров поиск абсолютной идентичности искомому слову
      v => v.toLowerCase(), // для сравнения без учета регистра
      v => toKeyboardLayoutRuEn(v), //функция, которая для каждой английской буквы находит на клавиатуре русский аналог и возвращает "переведённую" строку. полезно, если человек начал печатать, забыв перед этим переключить раскладку
      v => toKeyboardLayoutRuEn(v.toLowerCase()),// предыдущая функция + без учета регистра (2 в 1)
    ]
  }
};

const users = [{id: 30050, name: 'Вася', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
  {id: 30052, name: 'D', surname: 'Аасечкин', age: 1},
  {id: 30053, name: 'Ds', surname: 'Яасечкин', age: 5},
  {id: 30054, name: 'Ася', surname: 'Петрова', age: 12},
  {id: 30055, name: 'Mike', surname: 'Gitt', age: 1},];

function DataTable(config, data) {
  /* if data undefinite, then the date will be taken through the api request  */
  if (!data) {
    let s = requestApi(config.apiUrl);
  } else {

    /* statusArray for change sort buttons (buttons from src="https://kit.fontawesome.com/14fb9e47fb.js") */
    const statusArray = [{"unsort": "fas fa-sort", "sortUp": "fas fa-sort-up", "sortDown": "fas fa-sort-down"},
      {"fas fa-sort": "unsort", "fas fa-sort-up": "sortUp", "fas fa-sort-down": "sortDown"}];
let dataUpdate = data.slice();
    let data1 = data.slice();
    let status = "unsort";
    let searchKey="";
    let columnSort = config.columns[0];
    if (config.search) {
      createFieldSearch();
    }

    let buttonAdd = createButton(document.querySelector(config.parent),"Add","btn2-white table-modal-trigger"); // create button "Add" for add new data
    buttonAdd.setAttribute("data-target", "add");


    let table = createTable();
    let thead = createTableHeader();
    renderTable(data1);    // show start (unsort) table
    createSortButtons(table); // add buttons for sort table
  //  initListenerModal();  // add listener for buttons "table-modal-trigger"

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

      let tbody = document.createElement("tbody");
      table.appendChild(tbody);
      let numberUser = 0;
      for (let i = 0; i < arrayUsers.length; i++) {
        numberUser++;
        let trTbody = document.createElement("tr");
        let td = document.createElement("td");
        let text = document.createTextNode(numberUser);  // don't sort
        td.appendChild(text);
        trTbody.appendChild(td);
        for (let j = 1; j < config.columns.length - 1; j++) {
          let text;
          let key = config.columns[j].value;
          let td = document.createElement("td");
          if (typeof config.columns[j].value === "function") { // for calculate age from format Data
            text = document.createTextNode(config.columns[j].value(arrayUsers[i]));
          } else {
            text = document.createTextNode(arrayUsers[i][key]);
          }
          if (config.columns[j].type === "number") {
            td.setAttribute("class", "align-right");
          }
          td.appendChild(text);
          trTbody.appendChild(td);
        }
        td = document.createElement("td");
        let buttonDelete = createButton(td, "Delete", "btn2-danger");
        buttonDelete.onclick = function () {
          deleteUser(arrayUsers[i].id).then(() => update(config.apiUrl).then((data) => {
            removeBodyTable();
            renderTable(data);
            dataUpdate=data.slice();
          }));
        }
        let buttonEdit = createButton(td, "Edit", "btn2-warning table-modal-trigger");
        buttonEdit.setAttribute("data-target", "user" + arrayUsers[i].id);
        trTbody.appendChild(td);
        tbody.appendChild(trTbody);
      }
      initListenerModal(); // add listener for buttons "table-modal-trigger"
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
      if (column.type === "number" || column.type === "data") {
        sortArrayNumber(koef, column.value);
      } else {
        sortArrayText(koef, column.value);
      }

      function sortArrayNumber(koef, column) {
        arrayUsers.sort(function (a, b) {
          return koef * (a[column] - b[column]);
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
      searchKey = event.target.value;
      if (searchKey === "") {
        data1 = dataUpdate.slice();
      } else {
        data1 = searchForKey(dataUpdate.slice(), searchKey);
      }
      removeBodyTable();
      restartButtonsStatus();
      renderTable(data1);
      //return searchKey;
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
                    (config.search.filters[k](searchValues[j]).includes(config.search.filters[k](key))))) {
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
            columnSort = config.columns[j];
            let newArray = sortArray(data1.slice(0), status, config.columns[j]);
            removeBodyTable();
            renderTable(newArray);
          };
        }
      }
    }


    function createButton(parent, text, atributeClass) {
      let button = document.createElement("button");
      button.innerText = text;
      button.setAttribute("class", atributeClass);
      parent.appendChild(button);
      return button;
    }

    async function deleteUser(userId) {
      let urlForDelete = configTable.apiUrl + '/' + userId;
      const response = await fetch(urlForDelete, {
        method: 'DELETE',
        body: JSON.stringify(data)
      });
      return await response.json();
    }


    function createModalWindow(modalId, indexRow) {
      let window_modal = document.createElement("div");
      window_modal.setAttribute("class", "table-modal");
      window_modal.setAttribute("id", modalId);
      document.querySelector(".table-modal-trigger[data-target=" + modalId + "]").after(window_modal);
      for (let i = 0; i < config.columns.length; i++) {
        let div = document.createElement("div");
        if (config.columns[i].editable!==false) {
          let text = document.createTextNode(config.columns[i].title);
          let inputEntry = document.createElement("input");
          if (config.columns[i].type === "data") {
            inputEntry.placeholder = "2019-04-18T00:05:14.630Z"; // подсказка, что вводить
          }
          if (modalId != "add") {
            inputEntry.value = data1[indexRow][config.columns[i].value];  // if Edit, then show value
          }
          inputEntry.type = "text";
          inputEntry.id = config.columns[i].value;
          div.appendChild(text);
          window_modal.appendChild(div);
          window_modal.appendChild(inputEntry);
        }
      }

      let buttonSave = createButton(window_modal,"Save","btn-word");

      buttonSave.onclick = function () {
        let url=config.apiUrl;
        let metodRequest = 'POST';
        if (modalId != "add") {
          url= config.apiUrl + "/" + data1[indexRow].id;
          metodRequest = 'PUT';
        }
        saveData(metodRequest, url).then(() => update(config.apiUrl).then((data) => {
          dataUpdate=data.slice();
          let dataUpdateKey=data.slice();
          if (searchKey!="") {dataUpdateKey = searchForKey(dataUpdateKey,searchKey)};
          let dataUpdateSort=dataUpdateKey;
          if (status!="unsort"){
            dataUpdateSort=sortArray(dataUpdateKey.slice(),status,columnSort)};
          removeBodyTable();
          renderTable(dataUpdateSort);
        }));

      };

      return window_modal;
    }


    /* for table modal */
    function initListenerModal() {
      /* all buttons "modal close" must close (hidden) modal window */
      let x = document.getElementsByClassName("table-modal-trigger");
      for (let i = 0; i < x.length; i++) {
        const button = x[i];
        const dataTarget = x[i].dataset.target;
        button.onclick = () => {
          window_modal = createModalWindow(dataTarget, i - 1);  // i = indexRow  (1 for add)
          /* add button X for close modal window */
          window_modal.insertAdjacentHTML("afterbegin", `<button class="modal-close close-button">X</button>`);
          /* add blackout background for modal window */
          let modalBackground = document.createElement("div");
          modalBackground.classList.add("modal-bg-dark");
          window_modal.before(modalBackground);

          let btn_close = document.getElementsByClassName("modal-close");
          for (let i = 0; i < btn_close.length; i++) {
            btn_close[i].onclick = (e) => {
              window_modal.previousSibling.remove();
              window_modal.remove();
            }
          }
        }
      }
    }

  }


  async function saveData(metodRequest, url) {
    let dataNew = {};
    for (let i = 0; i < config.columns.length; i++) {
      if (config.columns[i].editable!==false) {
        if (config.columns[i].type === "data") {
          dataNew["publishDate"] = document.getElementById(config.columns[i].value).value;  // publishDate in data urlApi
        } else {
          dataNew[config.columns[i].value] = document.getElementById(config.columns[i].value).value;
        }
      }
    }

    try {     // from https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch(url, {
        method: metodRequest,
        body: JSON.stringify(dataNew),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      alert("Was saved");
    } catch (error) {
      console.error('Ошибка:', error);
    }

  }


  async function requestApi(url) {
    fetch(url)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        DataTable(configTable, data);
      })
  }


  async function update(url) {
    const response = await fetch(url, {
      method: 'GET',
    });
    return await response.json();
  }


}


function toKeyboardLayoutRuEn(str) {
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


function calculateAge(timeX) {
  let today = new Date();
  let dataPublish = new Date(timeX);
  //let age = today.getFullYear()-dataPublish.getFullYear();  // for years
  let age = Math.round((today - dataPublish) / (30 * 24 * 60 * 60 * 1000));  // for months
  return age;
}


DataTable(configTable);


