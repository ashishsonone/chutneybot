// also include ngRoute for all our routing needs
var casesApp = angular.module('casesApp', ['ngRoute']);

// configure our routes
casesApp.config(function($routeProvider) {
  $routeProvider
    // route for the home page
    .when('/cases', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage Response Cases",
            idKey : 'name',
            searchField : 'name',
            resPath : "/api/obj/cases",
            mapping : {
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
            },
            
            externalLinkBase : '#cases/',
            externalLinkKey : 'name',
            externalLinkLabel : 'Edit Bot Responses'
          }
          return c;
        }
      }
    })
  
    .when('/people', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage People",
            idKey : '_id',
            searchField : 'name',
            resPath : "/api/obj/people",
            mapping : {
              name : {
                type : 'line',
                label : 'Name'
              },
              nameId : {
                type : 'line',
                label : 'Name ID',
                hide : true
              },
              position : {
                type : 'line',
                label : 'Position'
              },
              positionId : {
                type : 'line',
                label : 'Position ID',
                hide : true
              },
              office : {
                type : 'line',
                label : 'Office'
              },
              email : {
                type : 'line',
                label : 'Email',
                hide : true
              },
              phone : {
                type : 'line',
                label : 'Phone',
                hide : true
              },
              tweet : {
                type : 'line',
                label : 'Tweet',
                hide : true
              },
              linkedin : {
                type : 'line',
                label : 'LinkedIn',
                hide : true
              }
            }
          }
          return c;
        }
      }
    })
  
    .when('/awards', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage Awards",
            idKey : '_id',
            searchField : 'name',
            resPath : "/api/obj/awards",
            mapping : {
              name : {
                type : 'line',
                label : 'Name'
              },
              nameId : {
                type : 'line',
                label : 'Name ID',
                hide : true
              },
              workNick : {
                type : 'line',
                label : 'Work Nick'
              },
              dom_int : {
                type : 'line',
                label : 'Domestic/International',
                hide : true
              },
              year : {
                type : 'line',
                label : 'Year',
                hide : true
              },
              client : {
                type : 'line',
                label : 'Client Name',
                hide : true
              },
              clientId : {
                type : 'line',
                label : 'Client ID',
                hide : true
              },
              type : {
                type : 'line',
                label : 'Type',
                hide : true
              },
              office : {
                type : 'line',
                label : 'Office',
                hide : true
              }
            }
          }
          return c;
        }
      }
    })
  
    .when('/work', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage Work",
            idKey : '_id',
            searchField : 'title',
            resPath : "/api/obj/work",
            mapping : {
              title : {
                type : 'line',
                label : 'Title'
              },
              nick : {
                type : 'line',
                label : 'Nick(Id)',
                hide : true
              },
              summary : {
                type : 'paragraph',
                label : 'Summary',
                hide : true
              },
              client : {
                type : 'line',
                label : 'Client Name',
              },
              clientId : {
                type : 'line',
                label : 'Client Id',
                hide : true
              },
              link : {
                type : 'line',
                label : 'Work Link',
                hide : true
              },
              thumbnail : {
                type : 'line',
                label : 'Thumbnail',
                hide : true
              },
              type : {
                type : 'line',
                label : 'Type',
                hide : true
              },
              office : {
                type : 'line',
                label : 'Office',
              },
            }
          }
          return c;
        }
      }
    })
  
    .when('/clients', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage Clients",
            idKey : '_id',
            searchField : 'name',
            resPath : "/api/obj/clients",
            mapping : {
              name : {
                type : 'line',
                label : 'Name'
              },
              nameId : {
                type : 'line',
                label : 'Name ID',
                hide : true
              },
              logo : {
                type : 'line',
                label : 'Logo',
                hide : true
              },
              office : {
                type : 'line',
                label : 'Office',
              }
            }
          }
          return c;
        }
      }
    })
  
    .when('/cases/:case', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function($route){
          var kaseId = $route.current.params.case;
          var c = {
            title : "Manage responses for : ",
            headerMapping :{
              name : {
                type : 'line',
                label : 'Case'
              },
              description : {
                type : 'paragraph',
                label : 'Description'
              },
              variables : {
                type : 'line',
                label : 'Variables'
              }
            },
            headerResPath : "/api/obj/cases/" + kaseId,
            
            idKey : '_id',
            searchField : 'case',
            resPath : "/api/obj/responses",
            resParams : "?case=" + kaseId, //for use in GET all objects
            mapping : {
              case : {
                type : 'line',
                label : 'Case Name'
              },
              output : {
                type : 'array-paragraph',
                label : 'Output Response'
              }
            }
          }
          return c;
        }
      }
    })

    // route for the about page
    .when('/:other', {
      templateUrl : 'pages/reponses_list.html',
      controller  : 'responseController'
    })
});

// create the controller and inject Angular's $scope
casesApp.controller('caseController', ['$scope', '$location', '$window', 'config', function($scope, $location, $window, config) {
  $scope.BASE_URL = $location.protocol() + "://" + $location.host() + ":" + $location.port();//http://192.168.0.25:9999";

  $scope.title = config.title;
  $scope.idKey = config.idKey; //use to generate PUT /cases/:id url
  $scope.searchField = config.searchField;
  
  $scope.mapping = config.mapping;
  
  $scope.RES_URL = $scope.BASE_URL + config.resPath;
  $scope.RES_PARAMS = config.resParams;
  
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
