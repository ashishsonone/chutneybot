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
  
    .when('/news', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage News",
            idKey : '_id',
            searchField : 'headline',
            resPath : "/api/obj/news",
            mapping : {
              headline : {
                type : 'line',
                label : 'Headline'
              },
              source : {
                type : 'line',
                label : 'Source',
              },
              date : {
                type : 'line',
                label : 'Date',
              },
              link : {
                type : 'line',
                label : 'Link',
              }
            }
          }
          return c;
        }
      }
    })
  
    .when('/contacts', {
      templateUrl : 'pages/cases_list.html',
      controller  : 'caseController',
      resolve : {
        config : function(){
          var c = {
            title : "Manage Office Contacts",
            idKey : '_id',
            searchField : 'office',
            resPath : "/api/obj/contacts",
            mapping : {
              office : {
                type : 'line',
                label : 'Office'
              },
              address : {
                type : 'line',
                label : 'Address',
              },
              map : {
                type : 'line',
                label : 'Map Location',
              },
              phone : {
                type : 'line',
                label : 'Phone',
              },
              email : {
                type : 'line',
                label : 'Email',
              }
            }
          };
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
              output : {
                type : 'array-paragraph',
                label : 'Output Response'
              }
            },
            default : { //non-editable value for the following fields
              case : kaseId
            }
          }
          return c;
        }
      }
    })

    // route for the about page
    .when('/', {
      templateUrl : 'pages/admin_landing.html',
    })
});

