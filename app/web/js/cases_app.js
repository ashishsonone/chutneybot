// also include ngRoute for all our routing needs
var casesApp = angular.module('casesApp', ['ngRoute']);

// configure our routes
casesApp.config(function($routeProvider) {
  $routeProvider
    // route for the home page
    .when('/', {
        templateUrl : 'pages/cases_list.html',
        controller  : 'caseController'
    })

    // route for the about page
    .when('/:case', {
        templateUrl : 'pages/reponses_list.html',
        controller  : 'responseController'
    })

});

// create the controller and inject Angular's $scope
casesApp.controller('caseController', ['$scope', '$location', '$window', function($scope, $location, $window) {
  $scope.BASE_URL = $location.protocol() + "://" + $location.host() + ":" + $location.port();//http://192.168.0.25:9999";
  
  // create a message to display in our view
  $scope.toastText = "";
  
  $scope.kases = [];
  $scope.addMode = false;
  
  $scope.newKase = {};
  $scope.loading = false;
  
  $scope.showToast = function(msg, isError){
    $scope.toastText = msg;
  };
  
  $scope.editKase = function(kase){
    delete kase._old;
    kase._edit = true;
    kase._old = JSON.parse(JSON.stringify(kase))
  };
    
  $scope.cancelKase = function(kase){
    kase.name = kase._old.name;
    kase.description = kase._old.description;
    kase.variables = kase._old.variables;
    kase._edit = false;
  };
    
  $scope.saveKase = function(kase){
    console.log('saving case');
    var url = $scope.BASE_URL + "/api/obj/cases/" + kase.name;
    
    var data = {};
    data.name = kase.name;
    data.description = kase.description;
    data.variables = kase.variables;
    
    $.ajax({
      url : url,
      type : "PUT",
      data : data,
      success: function(data, textStatus, xhr) {
        kase._edit = false;
        delete kase._old;
        
        $scope.showToast("Success saving the case '" + kase.name + "'" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.showToast("Failure saving the case", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.deleteKase = function(kase) {
    var del = $window.confirm('Are you absolutely sure you want to delete?');

    if (del) {
      console.log('deleting given case');
      var url = $scope.BASE_URL + "/api/obj/cases/" + kase.name;
    
       $.ajax({
        url : url,
        type : "DELETE",
        success: function(data, textStatus, xhr) {
          $scope.showToast("Success deleting the case '" + kase.name + "'" , false);
          var index = $scope.kases.indexOf(kase);
          if(index > -1){
            $scope.kases.splice(index, 1);
          }

          $scope.$apply();
        },
        error: function(xhr, textStatus, err) {
          $scope.showToast("Failure deleting the case", true);
          $scope.$apply();
        }
      });
    }
  }
  
  $scope.addNewKase = function(){
    $scope.addMode = true;
    $scope.newKase = {};
  };
  
  $scope.cancelNewKase = function(){
    $scope.newCase = {};
    $scope.addMode = false;
  };
    
  $scope.saveNewKase = function(kase){
    console.log('saving new case');
    var url = $scope.BASE_URL + "/api/obj/cases/" + kase.name;
    
    var data = {};
    data.name = kase.name;
    data.description = kase.description;
    data.variables = kase.variables;
    
    $.ajax({
      url : url,
      type : "PUT",
      data : data,
      success: function(data, textStatus, xhr) {
        $scope.showToast("Success saving the new case '" + kase.name + "'" , false);
        $scope.kases.push(data);
        
        $scope.newKase = {};
        $scope.addMode = false;
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.showToast("Failure saving the new case", true);
        $scope.$apply();
      }
    });
  };
    
  $scope.fetchCases = function(){
    var url = $scope.BASE_URL + "/api/obj/cases";
    console.log("cases : " + url);
    
    $scope.loading = true;
    $.ajax({
      url : url,
      type : "GET",
      success: function(data, textStatus, xhr) {
        $scope.loading = false;
        $scope.kases = data;
        
        $scope.showToast("Success fetching cases" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.loading = false;
        $scope.showToast("Failure fetching cases", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.fetchCases();
}]);

casesApp.controller('responseController', function($scope) {
  $scope.message = 'Look at reponses for a case';
});
