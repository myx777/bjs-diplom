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
}

getExchangeRates();
setInterval(getExchangeRates, 60 * 1000);

//Операции с деньгами
const moneyOperation = new MoneyManager();

//пополнение баланса
moneyOperation.addMoneyCallback = (moneyAdd) => {
    ApiConnector.addMoney(moneyAdd, callback => {
        // debugger;
        console.log( callback );
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);            
        }
        moneyOperation.setMessage(callback.success, callback.error);
    });
    
}

//конвертирование валюты
moneyOperation.conversionMoneyCallback = (moneyConversion) => {
    ApiConnector.convertMoney(moneyConversion, callback => {
        console.log( callback );
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);           
        }
        moneyOperation.setMessage(callback.success, callback.error);
    });
}

//перевод валюты
moneyOperation.sendMoneyCallback = (moneySend) => {
    ApiConnector.transferMoney(moneySend, callback => {
        console.log( callback );
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);            
        }
        moneyOperation.setMessage(callback.success, callback.error);
    });
}

//Работа с избранным
const userFavorites = new FavoritesWidget();

//Запрос начального списка избранного
ApiConnector.getFavorites(callback => {
    console.log( callback );
    if(callback.success) {
        userFavorites.clearTable();
        userFavorites.fillTable(callback.data);
        moneyOperation.updateUsersList(callback.data);
    }
});

//добавление пользователя в список избранных
userFavorites.addUserCallback = (newUserFavorite) => {
    debugger;
    ApiConnector.addUserToFavorites(newUserFavorite, callback => {
        console.log( callback );
        if(callback.success) {
            userFavorites.clearTable();
            userFavorites.fillTable(callback.data);
            moneyOperation.updateUsersList(callback.data);
        }
        userFavorites.setMessage(callback.success, callback.error);
    }); 
}

//удаление пользователя из избранного
userFavorites.removeUserCallback = (userFavorit) => {
    ApiConnector.removeUserFromFavorites(userFavorit, callback => {
        console.log( callback );
        if(callback.success) {
            userFavorites.clearTable();
            userFavorites.fillTable(callback.data);
            moneyOperation.updateUsersList(callback.data);
        }
        userFavorites.setMessage(callback.success, callback.error);
    });    
}