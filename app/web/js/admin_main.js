// create the controller and inject Angular's $scope
angular.module('casesApp').controller('caseController', ['$scope', '$location', '$window', 'config', function($scope, $location, $window, config) {
  $scope.BASE_URL = $location.protocol() + "://" + $location.host() + ":" + $location.port();//http://192.168.0.25:9999";

  $scope.title = config.title;
  $scope.idKey = config.idKey; //use to generate PUT /cases/:id url
  $scope.searchField = config.searchField;
  
  $scope.mapping = config.mapping;
  
  $scope.RES_URL = $scope.BASE_URL + config.resPath;
  $scope.RES_PARAMS = config.resParams;

  $scope.default = config.default || {}; //default values for certain fields

  $scope.headerMapping = config.headerMapping;
  $scope.headerObject = null;
  $scope.HEAD_RES_URL = $scope.BASE_URL + config.headerResPath;
  
  $scope.externalLinkBase = config.externalLinkBase;
  $scope.externalLinkKey = config.externalLinkKey;
  $scope.externalLinkLabel = config.externalLinkLabel;
  
  $scope.toastText = "";
  $scope.toastError = false;
  
  $scope.kases = [];
  $scope.addMode = false;
  
  $scope.newKase = {}; //used after calling initNewKase
  $scope.loading = false;
  
  $scope.initNewKase = function(){
    $scope.newKase = {};
    for(var k in $scope.mapping){
      if($scope.mapping[k].type == 'array-paragraph'){
        $scope.newKase[k] = [];
      }
    }
    
    for(var k in $scope.default){
      $scope.newKase[k] = $scope.default[k];
    }
  };
  
  $scope.showToast = function(msg, isError){
    $scope.toastText = msg;
    $scope.toastError = isError;
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
    $scope.initNewKase();
  };
  
  $scope.cancelNewKase = function(){
    $scope.initNewKase();
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
        
        $scope.initNewKase();
        $scope.addMode = false;
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.showToast("Failure saving the new object", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.pushToArray = function(arr, newItem){
    if(!newItem){
      return;
    }
    arr.push(newItem.content);
    newItem.content = '';
  };
  
  $scope.removeFromArray = function(arr, item){
    var index = arr.indexOf(item);
    arr.splice(index, 1);
  };
    
  $scope.fetchCases = function(){
    var url = $scope.RES_URL + ($scope.RES_PARAMS || '');
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
  
  $scope.fetchHeaderObject = function(){
    var url = $scope.HEAD_RES_URL;
    console.log("header url : " + url);
    
    $scope.loading = true;
    $.ajax({
      url : url,
      type : "GET",
      success: function(data, textStatus, xhr) {
        $scope.loading = false;
        $scope.headerObject = data;
        
        $scope.showToast("Success fetching header object" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.loading = false;
        $scope.showToast("Failure fetching header object", true);
        $scope.$apply();
      }
    });
  };
  
  if($scope.headerMapping){
    console.log("fetching header");
    $scope.fetchHeaderObject();
  }
  
  $scope.fetchCases();

}]);

casesApp.controller('responseController', function($scope) {
  $scope.message = 'Look at reponses for a case';
});
