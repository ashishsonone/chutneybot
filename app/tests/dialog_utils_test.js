'use strict';

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var dialogUtils = require('../api/utils/dialog_utils');
var sinon = require('sinon');
var dialogConfig = require('../api/config/dialog');

//kind of integration test - depends on content of the actual nodes/contact.js
describe('mergeBranches', function() {
  it('mergeBranches(tree, branches) should work with empty branches list', function() {
    var newTree = dialogUtils.mergeBranches({}, []);
    expect(newTree).to.deep.equal({});
  });
  
  it('mergeBranches(tree, branches) should work with ["contact"] branches list', function() {
    var newTree = dialogUtils.mergeBranches({}, ["contact"]);
    expect(newTree).to.have.property("contact.name");
    expect(newTree).to.have.property("contact.number"); 
  });
});

describe("pruneEntities", function(){
  before(function() {
    // save original process.platform
    this.CONFIDENCE = Object.getOwnPropertyDescriptor(dialogConfig, 'CONFIDENCE');

    // redefine process.platform
    Object.defineProperty(dialogConfig, 'CONFIDENCE', {
      value: 0.4
    });
  });

  after(function() {
    // restore original process.platfork
    Object.defineProperty(dialogConfig, 'CONFIDENCE', this.CONFIDENCE);
  });
  
  it('pruneEntities() should work with empty entities map', function() {
    var entities = {};
    var prunedEntities = dialogUtils.pruneEntities(entities);
    expect(prunedEntities).to.be.a('object');
    expect(prunedEntities).to.be.deep.equal({});
  });
  
  it('pruneEntities() should work with entities with all intents with confidence <= 0.4', function() {
    var entities = {
      intent : [
        {
          confidence : 0.33,
          value : "greetings"
        }
      ],

      company : [
        {
          confidence : 0.23,
          value : "flipkart"
        },
        {
          confidence : 0.4,
          value : "Amazon"
        }
      ]
    };
    
    var prunedEntities = dialogUtils.pruneEntities(entities);
    expect(prunedEntities).to.be.a('object');
    expect(prunedEntities).to.be.deep.equal({});
  });
  
  it('pruneEntities() should work with entities with some intents with confidence > 0.4', function() {
    var entities = {
      intent : [
        {
          confidence : 0.45,
          value : "greetings"
        }
      ],

      company : [
        {
          confidence : 0.9,
          value : "flipkart"
        },
        {
          confidence : 0.4,
          value : "Amazon"
        }
      ]
    };
    
    var prunedEntities = dialogUtils.pruneEntities(entities);
    expect(prunedEntities).to.be.a('object');
    expect(prunedEntities).have.all.keys(['intent', 'company']);
    expect(prunedEntities.intent).have.all.keys(['arr', 'map']);
    expect(prunedEntities.company).have.all.keys(['arr', 'map']);
    expect(prunedEntities.company.arr.length).to.equal(1);//only contain flipkart entity
    expect(prunedEntities.intent.arr.length).to.equal(1);
    expect(prunedEntities.company.map).have.all.keys(['flipkart']); expect(prunedEntities.intent.map).have.all.keys(['greetings']);

  });
  
});