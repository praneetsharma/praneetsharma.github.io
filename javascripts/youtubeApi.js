// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
var youtubeResponse = "";

var searchId = 0;
var glbPlayer;

var isPopVidBoxOpen = 0;

var nextPageToken = '';
var prevPageToken = '';
var totalResults = 0;
var pageNum = 0;
var query = '';

function setPlayer(player)
{
	glbPlayer = player;
}


function clearSearchBox()
{
  	
	var parentObj = document.getElementById('searchResultsList');
	var removeObj = document.getElementById('singleSearchResult');
	parentObj.removeChild(removeObj);
	
	var newChildObj = document.createElement('div');
	newChildObj.id = 'singleSearchResult';
	parentObj.appendChild(newChildObj);
}

function clearSearchVidBoxPop()
{
	var parentObj = document.getElementById('sbox');
	var removeObj = document.getElementById('sboxChild');
	parentObj.removeChild(removeObj);
	
	var newChildObj = document.createElement('div');
	newChildObj.id = 'sboxChild';
	parentObj.appendChild(newChildObj);
  	
  	document.getElementById('sbox').style.height = '30px';
  
}

function clearPopVidBox()
{
	var parentObj = document.getElementById('box');
	var removeObj = document.getElementById('boxChild');
	parentObj.removeChild(removeObj);
	
	var newChildObj = document.createElement('div');
	newChildObj.id = 'boxChild';
	parentObj.appendChild(newChildObj);
  	
  	document.getElementById('box').style.height = '30px';
  
}

function fillPopVidBox(response)
{
  
  	if(isPopVidBoxOpen == 1)
    {
     	clearPopVidBox();
      	isPopVidBoxOpen = 0;
    }
  
  	$('#overlay').fadeIn(200,function(){
      	$('#box').animate({'top':'50px'},200);
    });
    
  	document.getElementById('box').style.height = '83%';
  	document.getElementById('boxChild').style.height = '90%';
  
  	obj = JSON.parse(response);
	var i;
	
	for(i=0;i<5;i++)
	{
		var title = obj.items[i].snippet.title;
		var thumbnail = obj.items[i].snippet.thumbnails.medium.url;
		var url = "https://www.youtube.com/watch?v=" + obj.items[i].id.videoId;
		var videoDescr = obj.items[i].snippet.description;
		var uploaderInfo = obj.items[i].snippet.channelTitle;
      	fillSinglePopVid(url, thumbnail, title, uploaderInfo, videoDescr, i);
	}
  
  	isPopVidBoxOpen = 1;
  
}


function fillSinglePopVid(url, imgSrc, title, uploaderInfo, videoDescr, i)
{
  	localUrl = url;
  
 	var parentObj = document.getElementById('boxChild');
  
  	var field = document.createElement('fieldset');
	
	//adding thumbnail
	var thumbnailDiv = document.createElement('div');
	thumbnailDiv.class="thumbnail";
	thumbnailDiv.id = 'tnail-'+i;
	thumbnailDiv.style.display = 'inline-block';
	var e1 = document.createElement('a');
	
  	e1.href = "javascript:addPopVideoToPlaylist('" + imgSrc + "," + title + "')";
  	//e1.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	
  	var img = document.createElement("img");
	img.src = imgSrc;
	img.width = '185';
	img.height = '104';
	e1.appendChild(img);
	thumbnailDiv.appendChild(e1);
	field.appendChild(thumbnailDiv);
	
	//adding title, uploaderInfo, and videoDescr
	var videoInfoDiv = document.createElement('div');
	videoInfoDiv.style.display = 'inline-block';
  	videoInfoDiv.style.verticalAlign = 'top';
  	videoInfoDiv.style.width = '70%';
  	videoInfoDiv.style.paddingLeft = '12px';
	var h3 = document.createElement('h3a');
	h3.class = 'videoTitle';
	var e2 = document.createElement('a');
	e2.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	e2.innerHTML = title;
	h3.appendChild(e2);
  	videoInfoDiv.appendChild(h3);
	/*field.appendChild(h3);*/
	var metaDiv = document.createElement('div');
	metaDiv.class = 'uploaderMeta';
  	metaDiv.style.verticalAlign = 'top';
	metaDiv.innerHTML = uploaderInfo;
  	metaDiv.style.fontSize = '13px';
  	metaDiv.style.fontWeight = 'bold';
  	metaDiv.style.color = 'black';
  	videoInfoDiv.appendChild(metaDiv);
	/*field.appendChild(metaDiv);*/
	var descrDiv = document.createElement('div');
	descrDiv.class = 'videoDescr';
	descrDiv.id = 'videoDescr';
  	descrDiv.style.verticalAlign = 'top';
	descrDiv.innerHTML = videoDescr;
  	descrDiv.style.fontSize = '12px';
  	videoInfoDiv.appendChild(descrDiv);
	/*field.appendChild(descrDiv);*/
  
  	field.appendChild(videoInfoDiv);
	
  	field.style.paddingBottom = '10px';
	
	
	parentObj.appendChild(field);
}

function addPopVideoToPlaylist(imgSrc, title)
{
  	var parentObj = document.getElementById('loopMain2Child');
  
  	var field = document.createElement('fieldset');
	
	//adding thumbnail
	var thumbnailDiv = document.createElement('div');
	thumbnailDiv.class="thumbnail";
	thumbnailDiv.id = 'tnail-'+i;
	thumbnailDiv.style.display = 'inline-block';
	var e1 = document.createElement('a');
  
  	//adding title
  	var videoInfoDiv = document.createElement('div');
	videoInfoDiv.style.display = 'inline-block';
  	videoInfoDiv.style.verticalAlign = 'top';
  	videoInfoDiv.style.width = '70%';
  	videoInfoDiv.style.paddingLeft = '12px';
	var h3 = document.createElement('h3a');
	h3.class = 'videoTitle';
	var e2 = document.createElement('a');
	e2.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	e2.innerHTML = title;
	h3.appendChild(e2);
  	videoInfoDiv.appendChild(h3);
  
  	field.style.paddingBottom = '10px';
	
	
	parentObj.appendChild(field);
}


function fillsearchVidBoxPop(response, isPrevReq)
{
  	
  	$('#soverlay').fadeIn(200,function(){
      	$('#sbox').animate({'top':'50px'},200);
    });
    
  	document.getElementById('sbox').style.height = '83%';
  	document.getElementById('sboxChild').style.height = '90%';
  
  	obj = JSON.parse(response);
	var i;
  
  	if(isPrevReq == 1)
    {
      	pageNum = pageNum - 1;
      
      	if(pageNum == 1)
        {
         	prevPageToken = '';
            document.getElementById('prevPgSB').style.display = 'none';
        }
      	
    }
  	else
    {
  		pageNum = pageNum + 1;
      	
      	if(pageNum > 1)
        {
            prevPageToken = obj.prevPageToken;
            document.getElementById('prevPgSB').style.display = 'block';
        }
        nextPageToken = obj.nextPageToken;
        document.getElementById('nxtPgSB').style.display = 'block';
        totalResults = obj.totalResults;
      	
    }
  	
  
  
	for(i=0;i<5;i++)
	{
		var title = obj.items[i].snippet.title;
		var thumbnail = obj.items[i].snippet.thumbnails.medium.url;
		var url = "https://www.youtube.com/watch?v=" + obj.items[i].id.videoId;
		var videoDescr = obj.items[i].snippet.description;
		var uploaderInfo = obj.items[i].snippet.channelTitle;
      	fillSingleSearchVidPop(url, thumbnail, title, uploaderInfo, videoDescr, i);
	}
  
}


function fillSingleSearchVidPop(url, imgSrc, title, uploaderInfo, videoDescr, i)
{
  	localUrl = url;
  
 	var parentObj = document.getElementById('sboxChild');
  
  	var field = document.createElement('fieldset');
	
	//adding thumbnail
	var thumbnailDiv = document.createElement('div');
	thumbnailDiv.class="thumbnail";
	thumbnailDiv.id = 'tnail-'+i;
	thumbnailDiv.style.display = 'inline-block';
	var e1 = document.createElement('a');
	e1.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	var img = document.createElement("img");
	img.src = imgSrc;
	img.width = '185';
	img.height = '104';
	e1.appendChild(img);
	thumbnailDiv.appendChild(e1);
	field.appendChild(thumbnailDiv);
	
	//adding title, uploaderInfo, and videoDescr
	var videoInfoDiv = document.createElement('div');
	videoInfoDiv.style.display = 'inline-block';
  	videoInfoDiv.style.verticalAlign = 'top';
  	videoInfoDiv.style.width = '70%';
  	videoInfoDiv.style.paddingLeft = '12px';
	var h3 = document.createElement('h3a');
	h3.class = 'videoTitle';
	var e2 = document.createElement('a');
	e2.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	e2.innerHTML = title;
	h3.appendChild(e2);
  	videoInfoDiv.appendChild(h3);
	/*field.appendChild(h3);*/
	var metaDiv = document.createElement('div');
	metaDiv.class = 'uploaderMeta';
  	metaDiv.style.verticalAlign = 'top';
	metaDiv.innerHTML = uploaderInfo;
  	metaDiv.style.fontSize = '13px';
  	metaDiv.style.fontWeight = 'bold';
  	metaDiv.style.color = 'black';
  	videoInfoDiv.appendChild(metaDiv);
	/*field.appendChild(metaDiv);*/
	var descrDiv = document.createElement('div');
	descrDiv.class = 'videoDescr';
	descrDiv.id = 'videoDescr';
  	descrDiv.style.verticalAlign = 'top';
	descrDiv.innerHTML = videoDescr;
  	descrDiv.style.fontSize = '12px';
  	videoInfoDiv.appendChild(descrDiv);
	/*field.appendChild(descrDiv);*/
  
  	field.appendChild(videoInfoDiv);
	
  	field.style.paddingBottom = '10px';
	
	
	parentObj.appendChild(field);
}



function parseUrlSearchResponse(response)
{
  	obj = JSON.parse(response);
  
  	var i =0;
  
  	var title = obj.items[i].snippet.title;
    var thumbnail = obj.items[i].snippet.thumbnails.medium.url;
    var url = "https://www.youtube.com/watch?v=" + obj.items[i].id.videoId;
    var videoDescr = obj.items[i].snippet.description;
    var uploaderInfo = obj.items[i].snippet.channelTitle;
  	
  
  	var localUrl = url;
  	var imgSrc = thumbnail;
  
  	var parentObj = document.getElementById('loopMain2Child');
	
	var field = document.createElement('fieldset');
	
	//adding thumbnail
	var thumbnailDiv = document.createElement('div');
	thumbnailDiv.class="thumbnail";
	thumbnailDiv.id = 'tnail-'+i;
	thumbnailDiv.style.display = 'inline-block';
	var e1 = document.createElement('a');
	e1.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	var img = document.createElement("img");
	img.src = imgSrc;
	img.width = '65';
	img.height = '44';
	e1.appendChild(img);
	thumbnailDiv.appendChild(e1);
	field.appendChild(thumbnailDiv);
	
	//adding title, uploaderInfo, and videoDescr
	var videoInfoDiv = document.createElement('div');
	videoInfoDiv.style.display = 'inline-block';
  	videoInfoDiv.style.verticalAlign = 'top';
  	videoInfoDiv.style.paddingLeft = '12px';
  	videoInfoDiv.style.paddingTop = '12px';

	var h3 = document.createElement('h3a');
	h3.class = 'videoTitle';
	var e2 = document.createElement('a');
	e2.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	e2.innerHTML = title;
	h3.appendChild(e2);
  	videoInfoDiv.appendChild(h3);
	/*field.appendChild(h3);*/
	/*var metaDiv = document.createElement('div');
	metaDiv.class = 'uploaderMeta';
  	metaDiv.style.verticalAlign = 'top';
	metaDiv.innerHTML = uploaderInfo;
  	videoInfoDiv.appendChild(metaDiv);*/
	/*var descrDiv = document.createElement('div');
	descrDiv.class = 'videoDescr';
	descrDiv.id = 'videoDescr';
  	descrDiv.style.verticalAlign = 'top';
	descrDiv.style.width = '700px';
	descrDiv.innerHTML = videoDescr;
  	videoInfoDiv.appendChild(descrDiv);*/
  
  	field.appendChild(videoInfoDiv);
	
  	field.style.paddingBottom = '10px';
	
	
	parentObj.appendChild(field);
  
  
  
  
}



function parseSearchResponse(response)
{
  	
	clearSearchBox();
	
	obj = JSON.parse(response);
	var i;
	
  
	for(i=0;i<10;i++)
	{
		var title = obj.items[i].snippet.title;
		var thumbnail = obj.items[i].snippet.thumbnails.medium.url;
		var url = "https://www.youtube.com/watch?v=" + obj.items[i].id.videoId;
		var videoDescr = obj.items[i].snippet.description;
		var uploaderInfo = obj.items[i].snippet.channelTitle;
		oneSearchResult(url, thumbnail, title, uploaderInfo, videoDescr, searchId);
		searchId++;
	}
}




function oneSearchResult(url, imgSrc, title, uploaderInfo, videoDescr, i)
{
	var localUrl = url;
	
	$.getScript("http://praneetsharma.github.io/javascripts/myJSFunctions.js", function(){
		//addUrlToMap
	});
	

	var parentObj = document.getElementById('singleSearchResult');
	
	var field = document.createElement('fieldset');
	
	//adding thumbnail
	var thumbnailDiv = document.createElement('div');
	thumbnailDiv.class="thumbnail";
	thumbnailDiv.id = 'tnail-'+i;
	thumbnailDiv.style.display = 'inline-block';
	var e1 = document.createElement('a');
	e1.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	var img = document.createElement("img");
	img.src = imgSrc;
	img.width = '185';
	img.height = '104';
	e1.appendChild(img);
	thumbnailDiv.appendChild(e1);
	field.appendChild(thumbnailDiv);
	
	//adding title, uploaderInfo, and videoDescr
	var videoInfoDiv = document.createElement('div');
	videoInfoDiv.style.display = 'inline-block';
  	videoInfoDiv.style.verticalAlign = 'top';
  	videoInfoDiv.style.paddingLeft = '12px';
	var h3 = document.createElement('h3');
	h3.class = 'videoTitle';
	var e2 = document.createElement('a');
	e2.href = "javascript:addLoopDivSpcl('"+localUrl+"')";
	e2.innerHTML = title;
	h3.appendChild(e2);
  	videoInfoDiv.appendChild(h3);
	/*field.appendChild(h3);*/
	var metaDiv = document.createElement('div');
	metaDiv.class = 'uploaderMeta';
  	metaDiv.style.verticalAlign = 'top';
	metaDiv.innerHTML = uploaderInfo;
  	videoInfoDiv.appendChild(metaDiv);
	/*field.appendChild(metaDiv);*/
	var descrDiv = document.createElement('div');
	descrDiv.class = 'videoDescr';
	descrDiv.id = 'videoDescr';
  	descrDiv.style.verticalAlign = 'top';
	descrDiv.style.width = '700px';
	descrDiv.innerHTML = videoDescr;
  	videoInfoDiv.appendChild(descrDiv);
	/*field.appendChild(descrDiv);*/
  
  	field.appendChild(videoInfoDiv);
	
  	field.style.paddingBottom = '10px';
	
	
	parentObj.appendChild(field);
}





function fillImportPlaylistBox()
{
  
  	$('#impPlaylistoverlay').fadeIn(200,function(){
      	$('#impPlaylistbox').animate({'top':'50px'},200);
    });
  
 	 
}



function dimScreen()
{
  	document.getElementById('urDiv').style.zIndex = 76;
  	document.getElementById('urDiv').style.position = 'fixed';
  	document.getElementById('opaqueScreen').style.display = 'block';
  	document.getElementById('opaqueScreen').style.zIndex = 75;
  	document.getElementById('dimScreenBtn').style.display = 'none'; 	
  	document.getElementById('brightScreenBtn').style.display = 'inline-block'; 	
}

function brightScreen()
{
 	document.getElementById('dimScreenBtn').style.display = 'inline-block'; 	
  	document.getElementById('brightScreenBtn').style.display = 'none'; 
  	document.getElementById('opaqueScreen').style.display = 'none';
  	document.getElementById('urDiv').style.zIndex = 0;
  	document.getElementById('urDiv').style.position = 'relative'; 
  	document.getElementById('opaqueScreen').style.zIndex = 0;
}




/*function onYouTubeIframeAPIReady() {

	// Load the IFrame Player API code asynchronously.
	  var tag = document.createElement('script');
	  tag.src = "https://www.youtube.com/player_api";
	  var firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	  // Replace the 'ytplayer' element with an <iframe> and
	  // YouTube player after the API code downloads.
	  var player;
	  function onYouTubePlayerAPIReady() {
		player = new YT.Player('ytplayer', {
		  height: '390',
		  width: '640',
		  videoId: 'M7lc1UVf-VE'
		});
	  }
}*/

function playVideoInBox()
{
	$.getScript("http://praneetsharma.github.io/javascripts/myJSFunctions.js", function(){
			hideDiv("singleSearchResult");
			showDiv("videoBox");
	});
	
	player.loadVideoById("DdTLXQNOA2s", 0, "large");
	//player.cueVideoById("DdTLXQNOA2s", 0, "large");
	//$("#player").loadVideoById("bHQqvYy5KYo", 5, "large");
	
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

function searchPopular() {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet'
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    //request.execute(onSearchResponse);
	request.execute(function(response){
		var str = JSON.stringify(response.result);
		fillPopVidBox(str);
	});
	
}

function searchTrending(){
  	
  	var xmlhttp = new XMLHttpRequest();
  	var url1 = "https://gdata.youtube.com/feeds/api/standardfeeds/on_the_web?alt=json";
  	
  	xmlhttp.open("GET", url1, true);
  	var rsp = JSON.parse(url1);
 	 
}


function search(queryTxt) {
  	query = queryTxt;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
      	type: 'video',
		q: queryTxt
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    //request.execute(onSearchResponse);
	request.execute(function(response){
		var str = JSON.stringify(response.result);
		youtubeResponse = str;
      	clearSearchVidBoxPop();
      	fillsearchVidBoxPop(str, 0);
		//parseSearchResponse(str);
	});
	
}

function searchResponsePrevious(queryTxt) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
      	type: 'video',
      	pageToken: prevPageToken,
		q: query
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    //request.execute(onSearchResponse);
	request.execute(function(response){
		var str = JSON.stringify(response.result);
		youtubeResponse = str;
      	clearSearchVidBoxPop();
      	fillsearchVidBoxPop(str, 1);
		//parseSearchResponse(str);
	});
	
}

function searchResponseNext(queryTxt) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
      	type: 'video',
      	pageToken: nextPageToken,
		q: query
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    //request.execute(onSearchResponse);
	request.execute(function(response){
		var str = JSON.stringify(response.result);
		youtubeResponse = str;
      	clearSearchVidBoxPop();
      	fillsearchVidBoxPop(str, 0);
		//parseSearchResponse(str);
	});
	
}


function searchUrl() {
  	queryTxt = document.getElementById('urlInp').value;
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
      	parseUrlSearchResponse(str);
    });
	
}


// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
	//returnResponse(response);
}