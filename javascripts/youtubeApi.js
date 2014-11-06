// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
var youtubeResponse = "";
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
	});
	
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
	//returnResponse(response);
}