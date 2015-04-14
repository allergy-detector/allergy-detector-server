
  // public/core.js
  angular.module('allergyDetectorConsole', [])
  
  .controller('mainController', ['$scope', '$http', '$location',  function($scope, $http, $location){
    $scope.userSignin = {};
    $scope.userSignup = {};

    $scope.queryUsers = function(){
     $http.get('/api/users')
     .success(function(data){
      console.log(data);
    })
     .error(function(data){
      console.log('error');
    });
   }

   $scope.authenticate = function(){
    var data = {};
    data.name =  $scope.userSignin.name;
    data.password =  $scope.userSignin.password;

    $http.post('/user/authenticate', data)
    .success(function(data){
      alert('Login Efetuado com sucesso!');
    })
    .error(function(data){
      alert(data);
    });
  }


  $scope.signup = function(){
    var data = {};
    data.name =  $scope.userSignup.name;
    data.password =  $scope.userSignup.password;
    data.allergies = $scope.userSignup.allergies;

    $http.post('/user/create', data)
    .success(function(data){
      alert('Usuário cadastrado com sucesso!');
    })
    .error(function(data){
      alert(data);
    });
  }

}])
