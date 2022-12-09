let data;

function addTransaction() {

}

function getLocalStorage() {
  const lsdata = window.localStorage.getItem('data');
  if (lsdata) {
    data = JSON.parse(lsdata);
  } else {
    data = {
      savings: 0,
      totalInput: 0,
      totalExpense: 0,
      history: [{name: 'casa', value: -100}]
    }
  }
  updatePageData();
}

function updatePageData() {
  const savingsHtmlElement = document.querySelector('#savings');
  savingsHtmlElement.textContent = `${data.savings.toFixed(2)} €`;

  const totalInputHtmlElement = document.querySelector('#totalInput');
  totalInputHtmlElement.textContent = `${data.totalInput.toFixed(2)} €`;

  const totalExpenseHtmlElement = document.querySelector('#totalExpense');
  totalExpenseHtmlElement.textContent = `${data.totalExpense.toFixed(2)} €`;

  if (data.history.length === 0) {
    drawTable('Ningun valor añadido');
  } else {
    data.history.forEach((element, index) => {
      drawTable(element.name, element.value, index);
    });
  }
}

function drawTable(name, value, index) {
  const historyHtmlElement = document.querySelector('#history');
  const line = document.createElement('tr');
  const column1 = document.createElement('td');
  column1.textContent = name;
  line.appendChild(column1);

  if (value) {
    if (value > 0) {
      column1.style.borderLeftColor = 'rgb(62, 172, 117)';
    } else {
      column1.style.borderLeftColor = 'rgb(155, 50, 50)';
    }

    const column2 = document.createElement('td');
    column2.textContent = `${value.toFixed(2)} €`;
    line.appendChild(column2);

    const column3 = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', function() {
      removeHistoryItem(index);
    });
    column3.appendChild(button);
    line.appendChild(column3);
  }

  historyHtmlElement.appendChild(line);
}

function removeHistoryItem(index) {

}



