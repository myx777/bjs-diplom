"use strict"

const user = new UserForm();

user.loginFormCallback = (data) => {
    // debugger;    
    console.log(data);
    ApiConnector.login(data, callback => {
        console.log( callback );
        if(callback.success === true) {
            location.reload();
        } 

        user.setLoginErrorMessage(callback.error);
        
    });
    
};

user.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.register(data, callback => {
        console.log( callback );
        if(callback.success) {
            location.reload();
        }
        
        user.setRegisterErrorMessage(callback.error);
    })
}

