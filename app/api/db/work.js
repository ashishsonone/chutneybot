var works = [
  {
    title : 'Flipkart First',
    summary : 'Bacchon wali ad',
    client : 'flipkart',
    link : 'http://flipkart.com',
    thumbnail : 'http://thumb.flipkart.com',
    type : ['banner'],
    office : 'mumbai'
  },
  {
    title : 'Pepsi Thi Pe Gaya',
    summary : 'Cool ad',
    client : 'airtel',
    link : 'http://pepsi.com',
    thumbnail : 'http://thumb.pepsi.com',
    type : ['ad'],
    office : 'bengaluru'
  },
  {
    title : 'Pepsi Thi Jeet Gaya',
    summary : 'Best pepsi ad',
    client : 'airtel',
    link : 'http://pepsi.com/peegaya',
    thumbnail : 'http://thumb.pepsi.com/jeetgaya',
    type : ['ad'],
    office : 'bengaluru'
  },
  {
    title : 'Flipkart 2',
    summary : 'Bacchon wali ad',
    client : 'flipkart',
    link : 'http://flipkart.com',
    thumbnail : 'http://thumb.flipkart.com',
    type : ['banner'],
    office : 'mumbai'
  },
  {
    title : 'Pepsi Thi Pe Gaya 3',
    summary : 'Cool ad',
    client : 'airtel',
    link : 'http://pepsi.com',
    thumbnail : 'http://thumb.pepsi.com',
    type : ['ad'],
    office : 'gurgaon'
  },
  {
    title : 'Pepsi Thi Jeet Gaya 4',
    summary : 'Best pepsi ad',
    client : 'airtel',
    link : 'http://pepsi.com/peegaya',
    thumbnail : 'http://thumb.pepsi.com/jeetgaya',
    type : ['ad'],
    office : 'bengaluru'
  },
  {
    title : 'Flipkart First 5',
    summary : 'Bacchon wali ad',
    client : 'flipkart',
    link : 'http://flipkart.com',
    thumbnail : 'http://thumb.flipkart.com',
    type : ['banner'],
    office : 'gurgaon'
  },
  {
    title : 'Pepsi Thi Pe Gaya 6',
    summary : 'Cool ad',
    client : 'airtel',
    link : 'http://pepsi.com',
    thumbnail : 'http://thumb.pepsi.com',
    type : ['ad'],
    office : 'gurgaon'
  },
  {
    title : 'Pepsi Thi Jeet Gaya 7',
    summary : 'Best pepsi ad',
    client : 'airtel',
    link : 'http://pepsi.com/peegaya',
    thumbnail : 'http://thumb.pepsi.com/jeetgaya',
    type : ['ad'],
    office : 'bengaluru'
  }
];

function getWork(limit, skip){
  if(!skip){
    skip = 0;
  }
  
  var result = [];
  for(i=skip; i<works.length; i++){
    if(i >= skip + limit){
      break;
    }
    var work = works[i];
    result.push(work);
  }
  return result;
}

function getWorkForCompany(company){
  var result = [];
  for(var i in works){
    var work = works[i];
    if(work.client == company){
      result.push(work);
    }
  }
  return JSON.parse(JSON.stringify(result));
}

function getWorkByOffice(office){
  var result = [];
  for(var i in works){
    var work = works[i];
    if(work.office == office){
      result.push(work);
    }
  }
  return JSON.parse(JSON.stringify(result));
}

module.exports = {
  getWork : getWork,
  getWorkForCompany : getWorkForCompany,
  getWorkByOffice : getWorkByOffice
};