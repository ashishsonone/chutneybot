var intro = {
  "chutney" : "We are a digitally driven, creatively led, strategically steered, technologically inspired, culturally tuned, socially concious, adjective obsessed agency.",
  
  "dentsu" : "Dentsu Inc. (Dentsu Aegis Network) is a Japanese international advertising and public relations company. Now, it has a network of agencies across the world under its umbrella – Webchutney is a part of this network."
};

var about1 = "Dentsu-Webchutney is not your typical advertising agency. We’re the weird and wonderful lovechild of advertising & technology. Since 1999 we’ve invented experiences, made ‘things’ communicate, disrupted storytelling and generally kicked ass all the way to the top. Which is where Dentsu found us. In 2013, we became part of DAN - A network that’s committed to Good Innovation, a philosophy we love & believe in.";

var about2 = "Today we’re bigger & better than ever before. Some of India’s biggest brands like Airtel, Flipkart, Redbull, are on our side. Over 250 of India’s most talented work with us across 3 pretty sexy offices. AND we get to create what’s next in our own Innovation lab!"

var about3 = "Moral of the story? Weird will always be the next cool. (Just ask the internet)";

function getChunteyIntro(){
  return [
    {
      _type : 'text',
      value : about1
    },
    {
      _type : 'text',
      value : about2
    },
    {
      _type : 'text',
      value : about3
    }
  ];
}

module.exports = {
  intro : intro,
  getChunteyIntro : getChunteyIntro
};