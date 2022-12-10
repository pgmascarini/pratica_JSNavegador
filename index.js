let data;

function addTransaction() {
  const formElement = document.querySelector('#form');
  const name = formElement.querySelector('#name').value;
  const total = Number(formElement.querySelector('#total').value);
  data.history.push({ name, total });

  if (total > 0) {
    data.totalInput += total;
  } else {
    data.totalExpense += total;
  }

  data.savings = data.totalInput + data.totalExpense;
  updatePageData();
  window.localStorage.setItem('data', JSON.stringify(data));
  formElement.reset();
}


function getLocalStorage() {
  const localStorageData = window.localStorage.getItem('data');
  if (localStorageData) {
    data = JSON.parse(localStorageData);
  } else {
    data = {
      savings: 0,
      totalInput: 0,
      totalExpense: 0,
      history: []
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

  const historyHtmlElement = document.querySelector('#history');
  historyHtmlElement.innerHTML = "";

  if (data.history.length === 0) {
    drawLine('Ningun valor añadido');
  } else {
    data.history.forEach((element, index) => {
      drawLine(element.name, element.total, index);
    });
  }
}


function drawLine(name, total, index) {
  const historyHtmlElement = document.querySelector('#history');
  const line = document.createElement('tr');
  const column1 = document.createElement('td');
  column1.textContent = name;
  line.appendChild(column1);

  if (index >= 0) {
    if (total > 0) {
      column1.style.borderLeftColor = 'rgb(62, 172, 117)';
    } else {
      column1.style.borderLeftColor = 'rgb(155, 50, 50)';
    }

    const column2 = document.createElement('td');
    column2.textContent = `${total.toFixed(2)} €`;
    line.appendChild(column2);

    const column3 = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', function () {
      removeHistoryItem(index);
    });
    column3.appendChild(button)
    line.appendChild(column3);
  }

  historyHtmlElement.appendChild(line);
}


function removeHistoryItem(index) {
  const toBeRemoved = data.history[index];

  if (toBeRemoved.total > 0) {
    data.totalInput -= toBeRemoved.total;
  } else {
    data.totalExpense -= toBeRemoved.total;
  }
  data.savings = data.totalInput + data.totalExpense;
  data.history.splice(index, 1);
  updatePageData();
  window.localStorage.setItem('data', JSON.stringify(data));
}

