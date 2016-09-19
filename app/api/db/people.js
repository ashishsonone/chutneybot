var people = [
  {
    _type : 'person-card',
    name : "Sidharth Rao",
    nameId : 'sidharth',
    
    position : 'CEO',
    positionId : 'ceo',
    
    office : 'mumbai',
    email : 'sidharth.rao@webchutney.net',
    phone : '91 22 61943666',
    photo : 'http://www.livemint.com/r/LiveMint/Period1/2015/06/29/Photos/Rao.jpg',
    tweet : 'https://twitter.com/sidharthrao/status/719474331554869248',
    linkedin : 'https://www.linkedin.com/in/sidharthrao'
  },
  {
    _type : 'person-card',
    name : "Sudesh Samaria",
    nameId : 'sudesh',
    
    position : 'CCO',
    positionId : 'cco',
    
    office : 'gurgaon',
    email : 'sudesh.samaria@webchutney.net',
    phone : '91 124 4781 700',
    photo : "http://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2F20160517222756788407_Sudesh.jpg&h=268&w=401&q=100&v=20150902&c=1",
    //tweet : null,
    linkedin : 'https://www.linkedin.com/in/sudesh-samaria-842473'
  },
  {
    _type : 'person-card',
    name : "Gautam Reghunath",
    nameId : 'gautam',
    
    position : 'Senior Vice President, Bangalore',
    positionId : 'svp',
    
    office : 'bengaluru',
    email : 'gautam.reghunath@webchutney.net',
    photo : 'https://www.google.co.in/search?q=Gautam+Reghunath&biw=1366&bih=662&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiC1NnL3prPAhXEE5QKHZmsAJIQ_AUIBigB#imgrc=PuLg8i2moblTDM%3A',
    //tweet : null,
    linkedin : 'https://in.linkedin.com/in/gautam-reghunath-03264825'
  },
  {
    _type : 'person-card',
    name : "PG Aditiya",
    nameId : 'aditiya',
    
    position : 'Creative Director, Copy',
    positionId : 'cdc',
    
    office : 'bengaluru',
    email : 'perinkula.aditya@webchutney.net',
    photo : 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/13346915_10153519990231561_5913233675933546944_n.jpg?oh=6f1f0ddbb0e9a210e0b9b6d3aa83f4c9&oe=587F6E0D',
    //tweet : null,
    linkedin : 'https://in.linkedin.com/in/p-g-aditiya-58b68429'
  },
  {
    _type : 'person-card',
    name : "Prashant Gopalakrishnan",
    nameId : 'gopalakrishnan',
    
    position : 'Associate Vice-President',
    positionId : 'avp',
    
    office : 'bengaluru',
    email : 'prashant.gopalakrishnan@webchutney.net',
    photo : 'https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiGwfeR75rPAhXFKZQKHQucADMQjRwIBw&url=http%3A%2F%2Fwww.afaqs.com%2Fnews%2Fstory%2F46937_Its-your-turn-to-shop-online-says-Flipkart&bvm=bv.133178914,d.dGo&psig=AFQjCNFAoGFdoYDhPvAA1Z2_gxJcDuZRuw&ust=1474355164429435',
    //tweet : null,
    linkedin : 'https://in.linkedin.com/in/prashant-gopalakrishnan-70939020'
  },
  {
    _type : 'person-card',
    name : "Ashwin Palkar",
    nameId : 'palkar',
    
    position : 'Associate Creative Director, Art',
    positionId : 'acda',
    
    office : 'bengaluru',
    email : 'ashwin.palkar@webchutney.net',
    photo : 'https://pbs.twimg.com/profile_images/378800000050179158/5a3ba438f1546c61caaa5de678d75989.jpeg',
    //tweet : null,
    linkedin : 'https://pbs.twimg.com/profile_images/378800000050179158/5a3ba438f1546c61caaa5de678d75989.jpeg'
  },
];

function getByPositionId(position){
  var person = null;
  for(var i in people){
    var p = people[i];
    if(p.positionId == position){
      person = p;
      break;
    }
  }
  return JSON.parse(JSON.stringify(person));
}

function getByNameId(name){
  var person = null;
  for(var i in people){
    var p = people[i];
    if(p.nameId == name){
      person = p;
      break;
    }
  }
  return JSON.parse(JSON.stringify(person));
}

module.exports = {
  getByPositionId : getByPositionId,
  getByNameId : getByNameId
};