"use strict"
//Выход из личного кабинета
const user = new LogoutButton();
user.action = () => {
    ApiConnector.logout(callback => {
        console.log( callback );
        if(callback.success) {
            location.reload();
        }
    });
}

//Получение информации о пользователе
ApiConnector.current(callback => {
    console.log( callback );
    if(callback.success) {
        ProfileWidget.showProfile(callback.data);
    }
});

//Получение текущих курсов валюты
const exchangeRates = new RatesBoard();
function getExchangeRates() {
    ApiConnector.getStocks(callback => {
        console.log( callback );
        if(callback.success) {
            exchangeRates.clearTable();
            exchangeRates.fillTable(callback.data);
        }
    }); 
};

getExchangeRates();
setInterval(getExchangeRates, 60 * 1000);

//Операции с деньгами
const moneyOperation = new MoneyManager();
moneyOperation.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, callback => {
        // debugger;
        console.log( callback );
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);
            
        }
        // при успехе выводит undefined, пока не придумал как решить
        moneyOperation.setMessage(callback.success, callback.error);
    });
    
}


