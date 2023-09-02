async function fetchPrice(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }
    const data = await response.json();
    return [Object.values(data)[0], Object.values(data)[1]];
  }
  
  async function repeater() {
    const [binanceTokenName, binanceTokenPrice] = await fetchPrice('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    document.querySelector('.tokenname').innerHTML = `${binanceTokenName}`;
    document.querySelector('.tokenprice').innerHTML = `${binanceTokenPrice}`;
    
    const [coinbaseTokenName, coinbaseTokenPrice] = await fetchPrice('https://api.coinbase.com/v2/prices/BTC-USD/spot');
document.querySelector('.tokenname-coinbase').innerHTML = `${coinbaseTokenName}`;
document.querySelector('.tokenprice-coinbase').innerHTML = `${coinbaseTokenPrice.data.amount}`;

  }
  
  setInterval(repeater, 1000);
  
  

// const axios = require('axios'); // Подключение модуля axios для скачивания страницы
// const fs = require('fs'); // Подключение встроенного в NodeJS модуля fs для работы с файловой системой
// const jsdom = require("jsdom"); // Подключение модуля jsdom для работы с DOM-деревом (1)
// const { JSDOM } = jsdom; // Подключение модуля jsdom для работы с DOM-деревом (2)


// const baseLink = 'https://www.bybit.com/en-US/trade/spot/BTC/USDT'; // Типовая ссылка на страницу со статьями (без номера в конце)

// axios.get(link)
// .then(response => {
//    var currentPage = response.data; // Запись полученного результата
//    const dom = new JSDOM(currentPage); // Инициализация библиотеки jsdom для разбора полученных html-данных как в браузере
//    // Определение количества ссылок на странице, потому что оно у них не всегда фиксированное. Эта цифра понадобится в цикле ниже

// });


// paginator(); // Запуск перехода по страницам и сбора статей