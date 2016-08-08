var companies = {
  "flipkart" : {
    type : "image",
    url : "https://pbs.twimg.com/profile_images/604644048/sign051.gif",
    caption : "Flipkart"
  },
  
  "pepsi" : {
    type : "image",
    url : "http://www.vetmed.ucdavis.edu/vmth/local_resources/images/featured_images/small_animal.jpg",
    caption : "Pepsi"
  }
};

var work = {
  "general" : [
    {
      type : "cards",
      value :[
        companies["flipkart"],
        companies["pepsi"]
      ]
    }
  ],
};

module.exports = {
  work : work,
  companies : companies
};