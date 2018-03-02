(function () {
    'use strict';

    angular
        .module('scotchApp')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
            var login = {
                username: username,
                password: password
              };
              let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
              };
             axios.post('http://127.0.0.1:34560/api/token', login, axiosConfig)  
             .then((result) => {
             $localStorage.currentUser = { username: username, token: result.data.token,prodi: username.substring(2, 4)};
             console.log("RESPONSE RECEIVED: ", result);
             callback(true);
             })
             .catch((result) => {
             console.log("AXIOS ERROR: ", result);
             callback(false);
             });
             
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;

        }
    }
})();