'use strict';
var app = angular.module('app', []);
app.controller('AppController', ['$scope', '$location', function($scope, $location){
  $scope.BASE_URL = $location.protocol() + "://" + $location.host() + ":" + $location.port();//http://192.168.0.25:9999";

  $scope.toastText;
  $scope.toastError;
  
  $scope.chatHistory = []; //chat history elements
  $scope.suggestions = []; //quick user input suggestions
  $scope.userInput; //content of input box
  
  $scope.sessionId; //unique session id received after
  
  $scope.menu = [
    {
      text : 'About Us'
    },
    {
      text : 'Services'
    },
    {
      text : 'People'
    },
    {
      text : 'Clients'
    },
    {
      text : 'Awards'
    },
    {
      text : 'Work with us'
    },
    {
      text : 'Case Studies'
    },
    {
      text : 'Misc'
    }
  ];
  
  $scope.isLink = function(x){
    if(typeof(x) == 'string'){
      if(x && x.indexOf('http') == 0){
        return true;
      }
    }
    return false;
  }
  
  $scope.getTypeOf = function(x){
    return typeof(x);
  };
  
  $scope.display = function(x, l){
    var type = typeof(x)
    if(type == 'number'){
      return x;
    }
    else{
      x = JSON.stringify(x);
    }
    
    if(l){
      x = x.substr(0, l);
    }
    return x;
  }
  
  $scope.pressEnter = function(keyEvent) {
    if (keyEvent.which === 13){
      $scope.chat();
    }
  };
  
  $scope.init = function(){
    $scope.initChat();
  };

  $scope.showToast = function(msg, isError){
    $scope.toastText = msg;
    $scope.toastError = isError;
  };
  
  $scope.initChat = function(){
    var url = $scope.BASE_URL + "/api/chat";
    console.log("initChat : " + url);
    //fill POST payload
    var data = {};

    $scope.loading = true;
    
    $.ajax({
      url : url,
      type : "POST",
      data : data,
      success: function(data, textStatus, xhr) {
        $scope.loading = false;
        $scope.sessionId = data.sessionId;
        
        var output = data.output;
        for(var i in output){
          var dialogue = output[i];
          dialogue.bot = true;
          $scope.chatHistory.push(dialogue);
        }
        
        $scope.suggestions = data.suggestions;
        
        $scope.showToast("Success starting up chat with sessionId=" + $scope.sessionId , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.loading = false;
        $scope.showToast("Failure starting up chat", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.chat = function(){
    var url = $scope.BASE_URL + "/api/chat";
    console.log("chat : " + url);
    
    //fill POST payload
    var data = {
      sessionId : $scope.sessionId,
      input : $scope.userInput
    };

    var dialogue = {
      bot : false,
      _type : "text",
      value : $scope.userInput
    };
    $scope.chatHistory.push(dialogue);

    $scope.userInput = "";
    
    $scope.loading = true;
    $.ajax({
      url : url,
      type : "POST",
      data : data,
      success: function(data, textStatus, xhr) {
        $scope.loading = false;
        var output = data.output;
        for(var i in output){
          var dialogue = output[i];
          dialogue.bot = true;
          $scope.chatHistory.push(dialogue);
        }
        
        $scope.suggestions = data.suggestions;
        
        $scope.showToast("Success chat" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.loading = false;
        $scope.showToast("Failure chat", true);
        $scope.$apply();
      }
    });
  };
  
  $scope.clickMenu = function(menuItem){
    console.log('Heya Menu clicked ' + menuItem.text);

    var url = $scope.BASE_URL + "/api/chat";
    console.log("chat : " + url);
    
    //fill POST payload
    var data = {
      sessionId : $scope.sessionId,
      menuItem : menuItem
    };

    var dialogue = {
      bot : false,
      _type : "text",
      value : menuItem.text
    };
    $scope.chatHistory.push(dialogue);

    $scope.userInput = "";
    
    $scope.loading = true;
    $.ajax({
      url : url,
      type : "POST",
      data : data,
      success: function(data, textStatus, xhr) {
        $scope.loading = false;
        var output = data.output;
        console.log('%j', output);
        for(var i in output){
          var dialogue = output[i];
          dialogue.bot = true;
          $scope.chatHistory.push(dialogue);
        }
        
        $scope.suggestions = data.suggestions;
        
        $scope.showToast("Success chat" , false);
        $scope.$apply();
      },
      error: function(xhr, textStatus, err) {
        $scope.loading = false;
        $scope.showToast("Failure chat", true);
        $scope.$apply();
      }
    });
  };  
  
  $scope.clickSuggestion = function(suggestion){
    console.log("clickSuggestion with " + suggestion);
    $scope.userInput = suggestion;
    $scope.chat();
  }
}]);