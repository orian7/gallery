//function for triggering search on a particular subreddit that the user has entered as input
function enterKeyPress(event) {
  event = event || window.event;

  //in case that the user pressed the enter key
    if (event.keyCode == 13)
    {
        clearDisplay();
        redditDisplay();
    }
}

//a function for displaying the pictures in the gallery
function redditDisplay() {
  //extricate the subreddit for the search of its pictures
  var subReddit = getSubreddit();
    var wall = document.querySelector(".wall");

    //extricate 20 pictures for the gallery from the reddit site
    reddit.top(subReddit).limit(20).fetch(function (res) {
      //loop over the data that the reddit returned
      for (var i = 0; i < res.data.children.length; i++) {
        var data = res.data.children[i].data;

        //creating a lovely gallery item
        var galleryItem = document.createElement("div");
        var link = document.createElement("a");
        //creating items for cover the pictures when hovering them
        var middle = document.createElement("div");
        var description = document.createElement("div");
        //creating the image element
        var thumbnail = document.createElement("img");

        //set the link for the reddit's appropriate post
        link.setAttribute("href", "https://www.reddit.com" + data.permalink);
        thumbnail.setAttribute("src", data.thumbnail);
        description.className = "description";
        //set the post's title
        description.innerText = data.title;
        middle.className = "middle";

        //trigger openning the post in a new tab
        link.target = "_blank";
        galleryItem.className = "gallery";

        //appending elements to our wonderful gallery
        galleryItem.appendChild(link);
        link.appendChild(thumbnail);
        middle.appendChild(description);
        link.appendChild(middle);
        wall.appendChild(galleryItem);
      }

  }, function(err) {
    //informing the user in case that the reddit returned an error
    alert("Reddit returned an error :(");
  });
}

//a function for define the required subreddit for the gallery
function getSubreddit() {
  var subReddit = document.getElementById("search").value;
  //in case that there is no input from the user

  if (subReddit == undefined || subReddit == "") {
    //define a default subreddit
    subReddit = 'funny';
  }
  return subReddit;
}

//a function for clearing the page from pictures
function clearDisplay() {
  var myNode = document.querySelector(".wall");

  //remove all the gallery wall's children (i.e. all the pictures)
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
