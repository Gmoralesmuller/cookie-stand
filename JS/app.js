'use strict';

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Store(locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesByCustomer) {
  this.locationName = locationName;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesByCustomer = avgCookiesByCustomer;
  this.cookiesPerHour = [];
  this.totalCookies = 0;
}

Store.prototype.estimate = function () {
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  for (let i = 0; i < horasAtencion.length; i++) {
    const numeroClientes = getRandomArbitrary(this.minCustomersPerHour, this.maxCustomersPerHour);
    const cookieHour = Math.ceil(numeroClientes * this.avgCookiesByCustomer);
    this.cookiesPerHour.push(cookieHour);
    this.totalCookies += cookieHour;
  }
};

Store.prototype.renderFilas = function () {
  const salesTable = document.getElementById("sales");
  const tr = document.createElement("tr");
  const tdStore = document.createElement("td");
  tdStore.textContent = this.locationName;
  tr.appendChild(tdStore);

  for (let i = 0; i < horasAtencion.length; i++) {
    const td = document.createElement("td");
    td.textContent = this.cookiesPerHour[i];
    tr.appendChild(td);
  }

  const tdTotal = document.createElement("td");
  tdTotal.textContent = this.totalCookies;
  tr.appendChild(tdTotal);

  salesTable.appendChild(tr);
};

const seattleTienda = new Store('Seattle', 23, 65, 6.3);
const dubaiTienda = new Store('Dubai', 11, 38, 3.7);
const tokyoTienda = new Store('Tokyo', 3, 24, 1.2);
const parisTienda = new Store('Paris', 20, 28, 2.3);
const limaTienda = new Store('Lima', 2, 16, 4.6);

const horasAtencion = ["6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm"];

const stores = [seattleTienda, dubaiTienda, tokyoTienda, parisTienda, limaTienda];

function renderStores() {
  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    store.estimate();
    store.renderFilas();
  }
}

function renderTotales() {
  const tfoot = document.getElementById("resumen");
  const row = document.createElement("tr");
  const nameCell = document.createElement("th");
  nameCell.textContent = "Total por hora";
  row.appendChild(nameCell);

  let totalDailyCookies = 0;
  const totalesHora = new Array(horasAtencion.length).fill(0);

  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    for (let j = 0; j < horasAtencion.length; j++) {
      totalesHora[j] += store.cookiesPerHour[j];
      totalDailyCookies += store.cookiesPerHour[j];
    }
  }

  for (let i = 0; i < totalesHora.length; i++) {
    const cell = document.createElement("td");
    cell.textContent = totalesHora[i];
    row.appendChild(cell);
  }

  const totalDailyCell = document.createElement("td");
  totalDailyCell.textContent = totalDailyCookies;
  row.appendChild(totalDailyCell);

  tfoot.appendChild(row);
}

window.addEventListener("load", function () {
  renderStores();
  renderTotales();
});



