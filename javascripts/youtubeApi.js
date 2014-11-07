// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
var youtubeResponse = "";



function parseSearchResponse(response)
{
	obj = JSON.parse(response);
	var i;
	
	for(i=0;i<5;i++)
	{
		var title = obj.items[i].snippet.title;
		var thumbnail = obj.items[i].snippet.thumbnails.medium.url;
		var url = "https://www.youtube.com/watch?v=" + obj.items[i].id.videoId;
		var videoDescr = obj.items[i].snippet.description;
		var uploaderInfo = obj.items[i].snippet.channelTitle;
		oneSearchResult(url, thumbnail, title, uploaderInfo, videoDescr);
	}
}




function oneSearchResult(url, imgSrc, title, uploaderInfo, videoDescr)
{
	var parentObj = document.getElementById('singleSearchResult');
	
	var field = document.createElement('fieldset');
	
	//adding thumbnail
	var thumbnailDiv = document.createElement('div');
	thumbnailDiv.class="thumbnail";
	var e1 = document.createElement('a');
	e1.href = "javascript:addLoopDiv()";
	var img = document.createElement("img");
	img.src = imgSrc;
	img.width = '185';
	img.height = '104';
	e1.appendChild(img);
	thumbnailDiv.appendChild(e1);
	field.appendChild(thumbnailDiv);
	
	//adding title, uploaderInfo, and videoDescr
	var videoInfoDiv = document.createElement('div');
	var h3 = document.createElement('h3');
	h3.class = 'videoTitle';
	var e2 = document.createElement('a');
	e2.href = "javascript:addLoopDiv()";
	e2.innerHTML = title;
	h3.appendChild(e2);
	field.appendChild(h3);
	var metaDiv = document.createElement('div');
	metaDiv.class = 'uploaderMeta';
	metaDiv.innerHTML = uploaderInfo;
	field.appendChild(metaDiv);
	var descrDiv = document.createElement('div');
	descrDiv.class = 'videoDescr';
	descrDiv.innerHTML = videoDescr;
	field.appendChild(descrDiv);
	
	
	
	
	parentObj.appendChild(field);
}




function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
	//youtubeResponse = responseString;
    document.getElementById('response').innerHTML += responseString;
}

function returnResponse(response) {
	return JSON.stringify(response, '', 2);
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyBGyrLRM1SQEyCvPOsYAosM0xO4zGWLkX0');

    //search("praneet");
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
}

function search(queryTxt) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
		q: queryTxt
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    //request.execute(onSearchResponse);
	request.execute(function(response){
		var str = JSON.stringify(response.result);
		youtubeResponse = str;
		parseSearchResponse(str);
	});
	
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
	//returnResponse(response);
}