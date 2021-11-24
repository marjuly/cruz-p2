// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0;
  }
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length[14];
  }
  var location = document.getElementByClassName("location")[0].innerhtml = "Location: " + mImages[mCurrentIndex].location;
  var description = document.getElementByClassName("description")[0].innerhtml = "Description: " + mImages[mCurrentIndex].description;
  var date = document.getElementByClassName("date")[0].innerhtml = "Date: " + mImages[mCurrentIndex].date;
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string
  var mLastFrameTime = 0;
  mCurrentIndex += 1;
	console.log('swap photo');
}

function iterateJSON(){
  for (var x = 0; x < mJson.length; x++) {
    mImages[x] = GalleryImage.location = mJson.images[x].imgLocation;
    mImages[x] = GalleryImage.description = mJson.images[x].imgDescription;
    mImages[x] = GalleryImage.date = mJson.images[x].imgDate;
    mImages[x] = GalleryImage.img/imgPath = mJson.images[x].img/imgPath;
  }
};

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.addEventListener("readystatechange", () => {
  //(console.log(request, request.readyChange))

  if (mRequest.readyState === 4 && mRequest.status === 200) {
    const data = JSON.parse(mRequest.responseText);
    console.log(data);
  } else if (mRequest.readyState === 4) {
    console.log("could not fetch the data");
  }
});

mRequest.open("GET", "../images.json");
mRequest.send();


// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
  fetchJSON().iterateJSON(mJson);
	// This initially hides the photos' metadata information
	//$('.details').eq(0).hide();

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);

function GalleryImage() {
  this.location;
  this.description;
  this.date;
  this.img;
}
