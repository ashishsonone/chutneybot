var awards = [
  {
    _type : 'award-card',
    name : 'Funny Award',
    worTitle : 'Airtel Open Network',
    workSummary : 'A revolutionary ad campaign just after the aatank of the airtel girl was over ;)',
    dom_int : 'domestic',
    year : 2015,
    client : 'airtel',
    workLink : '<work link>',
    thumbnailLink : '<thumbnail>',
    office : 'mumbai',
    type : ['ad']
  },
  {
    _type : 'award-card',
    name : 'Small Award',
    title : 'Flipcart Bacche',
    summary : 'A new concept of using child actors with voice of adults',
    dom_int : 'international',
    year : 2015,
    client : 'flipkart',
    link : '<work link>',
    thumbnail : '<thumbnail>',
    office : 'mumbai',
    type : ['ad']
  },
  {
    _type : 'award-card',
    name : 'Big Award',
    title : 'Flipcart Bade',
    summary : 'The old concept of using people with voice of children',
    dom_int : 'domestic',
    year : 2014,
    client : 'flipkart',
    link : '<work link>',
    thumbnail : '<thumbnail>',
    office : 'gurgaon',
    type : ['ad']
  },
  {
    _type : 'award-card',
    name : 'Pee Gaya',
    title : 'Pepsi Thi Pee Gaya',
    summary : 'Good Ad using collge students',
    dom_int : 'domestic',
    year : 2010,
    client : 'pepsi',
    link : '<work link>',
    thumbnail : '<thumbnail>',
    office : 'banglore',
    type : ['ad']
  }
];

function getAwards(limit, skip){
  if(!skip){
    skip = 0;
  }
  
  var result = [];
  for(var i=skip; i<awards.length; i++){
    if(i >= skip + limit){
      break;
    }
    var award = awards[i];
    result.push(award);
  }
  return JSON.parse(JSON.stringify(result));
}

function getAwardsForYear(year){
  var result = [];
  for(var i in awards){
    var award = awards[i];
    if(award.year == year){
      result.push(award);
    }
  }
  return JSON.parse(JSON.stringify(result));
}

function getAwardsDomInt(dom_int){
  var result = [];
  for(var i in awards){
    var award = awards[i];
    if(award.dom_int == dom_int){
      result.push(award);
    }
  }
  return JSON.parse(JSON.stringify(result));
}

module.exports = {
  getAwards : getAwards,
  getAwardsForYear : getAwardsForYear,
  getAwardsDomInt : getAwardsDomInt
};