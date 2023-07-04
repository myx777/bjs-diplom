"use strict"

const user = new UserForm();

user.loginFormCallback = (userLogin) => { 
    console.log(userLogin);
    ApiConnector.login(userLogin, callback => {
        console.log( callback );
        if(callback.success === true) {
            location.reload();
        } 

        user.setLoginErrorMessage(callback.error);
    });
    
}

user.registerFormCallback = (userRegister) => {
    console.log(userRegister);
    ApiConnector.register(userRegister, callback => {
        console.log( callback );
        if(callback.success) {
            location.reload();
        }
        
        user.setRegisterErrorMessage(callback.error);
    });
}

