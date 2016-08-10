var companies = {
  "flipkart" : {
    type : "image",
    url : "http://www.kelltontech.com/sites/default/files/icon%203.jpg.png",
    caption : "Flipkart"
  },
  
  "pepsi" : {
    type : "image",
    url : "https://pbs.twimg.com/profile_images/693938878424592385/iT_elI7o.png",
    caption : "Pepsi"
  },
  
  "snapdeal" : {
    type : "image",
    url : "https://pbs.twimg.com/profile_images/672841756702990336/xpVU8NQe.png",
    caption : "Snapdeal"
  },
  
  "airtel" : {
    type : "image",
    url : "https://static-s.aa-cdn.net/img/ios/879340543/b3fb5086917c843d43410f946374134c?v=1",
    caption : "Airtel"
  },
  
  "myntra" : {
    type : "image",
    url : "https://pbs.twimg.com/profile_images/579899136339652608/OOJiqQPu.png",
    caption : "Myntra"
  }
};

var work = {
  "general" : [
    {
      type : "cards",
      value :[
        companies["flipkart"],
        companies["pepsi"],
        companies["airtel"]
      ]
    }
  ],
};

var categories = {
  "ads" : [
    {
      type : "cards",
      value : [
        companies["myntra"],
        companies["snapdeal"]
      ]
    }
  ],
  "social media" : [
    {
      type : "cards",
      value : [
        companies["flipkart"],
        companies["airtel"]
      ]
    }
  ],
  "banner" : [
    {
      type : "cards",
      value : [
        companies["airtel"],
        companies["pepsi"]
      ]
    }
  ],
};

module.exports = {
  work : work,
  companies : companies,
  categories : categories
};