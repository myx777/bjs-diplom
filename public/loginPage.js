"use strict"

const user = new UserForm();

user.loginFormCallback = (data) => {
    // debugger;    
    console.log(data);
    ApiConnector.login(data, response => {
        console.log(response);
        if(response.success === true) {
            location.reload();
        } 

        user.setLoginErrorMessage(response.error);
        
    });
    
};

user.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.register(data, response => {
        console.log(response);
        if(response.success) {
            location.reload();
        }
        
        user.setRegisterErrorMessage(message);
    })
}

