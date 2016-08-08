var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var dialogUtils = require('../api/dialog_utils');
var sinon = require('sinon');

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