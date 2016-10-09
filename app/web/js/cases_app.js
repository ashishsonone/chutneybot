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

  $scope.title = "Manage Response Cases";
  $scope.idKey = 'name'; //use to generate PUT /cases/:id url
  
  $scope.mapping = {
    name : {
      type : 'line',
      label : 'Name'
    },
    description : {
      type : 'paragraph',
      label : 'Description'
    },
    variables : {
      type : 'line',
      label : 'Variables'
    }
  };
  
  $scope.RES_URL = $scope.BASE_URL + "/api/obj/cases";
  
  
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
    delete kase._edit;
    
    kase._old = JSON.parse(JSON.stringify(kase))
    kase._edit = true;
  };
    
  $scope.cancelKase = function(kase){
    for(var k in $scope.mapping){
      kase[k] = kase._old[k];
    }
    kase._edit = false;
  };
    
  $scope.saveKase = function(kase){
    console.log('saving case');
    var url = $scope.RES_URL + "/" + kase[$scope.idKey];
    
    var data = {};
    for(var k in $scope.mapping){
      data[k] = kase[k];
    }
    
    $.ajax({
      url : url,
      type : "PUT",
      data : data,
      success: function(data, textStatus, xhr) {
        kase._edit = false;
        delete kase._old;
        
        $scope.showToast("Success saving the object '" + kase[$scope.idKey] + "'" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.showToast("Failure saving the object", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.deleteKase = function(kase) {
    var del = $window.confirm('Are you absolutely sure you want to delete?');

    if (del) {
      console.log('deleting given case');
      var url = $scope.RES_URL + "/" + kase[$scope.idKey];
    
       $.ajax({
        url : url,
        type : "DELETE",
        success: function(data, textStatus, xhr) {
          $scope.showToast("Success deleting the object '" + kase[$scope.idKey] + "'" , false);
          var index = $scope.kases.indexOf(kase);
          if(index > -1){
            $scope.kases.splice(index, 1);
          }

          $scope.$apply();
        },
        error: function(xhr, textStatus, err) {
          $scope.showToast("Failure deleting the object", true);
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
    var url = $scope.RES_URL;
    
    var data = {};
    for(var k in $scope.mapping){
      data[k] = kase[k];
    }
    
    $.ajax({
      url : url,
      type : "POST",
      data : data,
      success: function(data, textStatus, xhr) {
        $scope.showToast("Success saving the new object '" + kase.name + "'" , false);
        $scope.kases.push(data);
        
        $scope.newKase = {};
        $scope.addMode = false;
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.showToast("Failure saving the new object", true);
        $scope.$apply();
      }
    });
  };
    
  $scope.fetchCases = function(){
    var url = $scope.RES_URL;
    console.log("cases : " + url);
    
    $scope.loading = true;
    $.ajax({
      url : url,
      type : "GET",
      success: function(data, textStatus, xhr) {
        $scope.loading = false;
        $scope.kases = data;
        
        $scope.showToast("Success fetching objects" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.loading = false;
        $scope.showToast("Failure fetching objects", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.fetchCases();
}]);

casesApp.controller('responseController', function($scope) {
  $scope.message = 'Look at reponses for a case';
});
