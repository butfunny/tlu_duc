"use strict";

(function () {

    angular.module("tlctf.security", [
    ])
        .factory("User", function() {
            return {
              isLogged : false
            };
        })

        .factory("Security", function(Api, $http, $q, $window, User, $state) {
            var deferLoading = $q.defer();

            function checkLogin(){
              var token = $window.localStorage.token;

              if (token == null) {
                var defer = $q.defer();
                defer.reject();
                $state.go("login");
                return defer.promise;
              }
              return Api.post("/api/security/check-token")
                .then(function (resp) {
                  angular.copy(resp.data.user, User);
                  User.isLogged = true;
                  $state.go("manager-contest");
                },
                function() {
                  angular.copy({}, User);
                  User.isLogged = false;
                  delete $window.localStorage.token;
                  $state.go("login");
                }
              );
            }

            var onLogins = [];
            var onLogouts = [];

            var status = {
              loading: true
            };

            Api.addCustomHeader(function () {
              if($window.localStorage.token){
                return {"Authorization" : "Bearer " + $window.localStorage.token} ;
              }
            });

            return {
              initialize : function () {
                checkLogin()
                  .then(
                  Fs.invokeAllF(onLogins),
                  Fs.invokeAllF(onLogouts)
                )
                  .finally(deferLoading.resolve);
              },
              login: function (loginDetail) {
                var defer = $q.defer();
                Api.post("/api/login", loginDetail).then(function (resp) {
                  if (resp.data.error) {
                    defer.reject();
                  } else {
                    $window.localStorage.token = resp.data.token;
                    angular.copy(resp.data.user, User);
                    User.isLogged = true;
                    Fs.invokeAll(onLogins);
                    defer.resolve();
                  }
                });
                return defer.promise;

              },
              onLogin: function(onLogin, onLogout) {
                deferLoading.promise.then(function() {
                  if (User.isLogged) {
                    onLogin();
                  } else {
                    if (onLogout) onLogout();
                  }

                  onLogins.push(onLogin);
                  if (onLogout) onLogouts.push(onLogout);
                });

                return function() {
                  _.pull(onLogins, onLogin);
                  _.pull(onLogouts, onLogout);
                }
              },
              ready: function() {
                return deferLoading.promise;
              },
              logout: function () {
                var oldToken = $window.localStorage.token;
                angular.copy({}, User);
                User.isLogged = false;
                delete $window.localStorage.token;
                Fs.invokeAll(onLogouts, oldToken);
                $state.go("login");
              },
              reloadToken: function (newUser, token) {
                angular.copy(newUser, User);
                $window.localStorage.token = token;
              },
              resetDataApp: function () {
                Fs.invokeAll(onLogins);
              }
            };
        })

      .run(function (Security) {
        Security.initialize();
      })
    ;

})();
