//variables to hold the data about the last and first pictures, for the pagination mechanism
var namefirst;
var namelast;
//a function to trigger and add the pagination mechanism
function paginationBtnClick() {
   var background = document.querySelector(".backgroundImg");
   document.querySelector(".paginationButton").hidden = true;
   //creating a button to navigate back to the regular gallery mode
   var btn = document.createElement("button");
   btn.className= "paginationButton";
   btn.innerText = "Back to Gallery Mode";
   //adding an event that will happen when the button is clicked
   btn.onclick = function () {
     btn.remove();
     document.querySelector(".paginationButton").hidden = false;
     //arrange the regular gallery display
     redditDisplay();
     document.getElementById('search').hidden = false;
     //for removing the arrows left & right
     document.getElementById("arrowRight").style.visibility = 'hidden';
     document.getElementById("arrowLeft").style.visibility = 'hidden';
   };
   background.appendChild(btn);
   clearDisplay();
   document.getElementById('search').hidden = true;
   document.getElementById("arrowRight").style.visibility = 'visible';
   //define the appropriate subreddit for the gallery
   var subReddit = getSubreddit();
   //extricate 8 pictures for the gallery from the reddit site
   reddit.top(subReddit).limit(8).fetch(function (res) {
     var wall = document.querySelector(".wall");
     //locate the gallery's wall under the button
     wall.style.position = "absolute";
     wall.style.top = 150 +'px';
     wall.style.left = 80 + 'px';
     addPicturesToGallery(res);
     //create and locate the right arrow for pagination mechanism
     var right = document.getElementById("arrowRight");
     right.style.position = "absolute";
     right.style.top = 200 +'px';
     right.style.right = 5 +'px';
     right.setAttribute("src", "C:/Users/oriantov/Desktop/wixProj/Images/right.png" );
      //create and locate the left arrow for pagination mechanism
     var left = document.getElementById("arrowLeft");
     left.style.visibility = 'hidden';
     left.style.position = "absolute";
     left.style.top = 200 +'px';
     left.style.left = 5 +'px';
     left.setAttribute("src", "C:/Users/oriantov/Desktop/wixProj/Images/left.png" );
     right.addEventListener("click", rightClick);
     left.addEventListener("click", leftClick);
   }, function(err) {
     //informing the user in case that the reddit returned an error
     alert("Reddit returned an error :(");
   });
}
//function to add pictures to the gallery from a given reddit result (res) as input
function addPicturesToGallery(res) {
  //update the namelast and namefirst each time we load new pictures for the gallery
  namelast = res.data.children[7].data.name;
  namefirst = res.data.children[0].data.name;
  var wall = document.querySelector(".wall");
  //loop over the data from the given reddit result
  for (var i = 0; i < res.data.children.length; i++) {
    var data = res.data.children[i].data;
    //creating a lovely gallery items
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
}
//function that will be executed each time the user has clicked the left arrow
function leftClick() {
  var subReddit = getSubreddit();
  clearDisplay();
  //extricate 8 pictures for the gallery from the reddit site, before the namefirst
  //(namefirst is the name of the first current picture in the gallery)
  reddit.top(subReddit).limit(8).before(namefirst).fetch(function (res) {
    //in case that there are no more pictures before the namefirst picture
    if (res.data.children.length < 1) {
      alert("No more pictures were left behind :) Please use the right arrow to continue forward :)");
      return;
    }
    addPicturesToGallery(res);
  }, function(err) {
      //in case that the reddit return an error, inform the user
      alert("Reddit returned an error :(");
  });
}
//function that will be executed each time the user has clicked the right arrow
function rightClick() {
   var subReddit = getSubreddit();
   document.getElementById("arrowLeft").style.visibility = 'visible';
   clearDisplay();
   //extricate 8 pictures for the gallery from the reddit site, after the namelast
   //(namelast is the name of the last current picture in the gallery)
    reddit.top(subReddit).limit(8).after(namelast).fetch(function (res) {
      addPicturesToGallery(res);
    }, function(err) {
      //in case that the reddit return an error, inform the user
      alert("Reddit returned an error :(");
    });
}
