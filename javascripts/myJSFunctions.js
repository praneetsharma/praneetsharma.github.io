
var loopDivCount = 1;  //divId
var curCount = 1; //number of divs present

var errorIdCurShown = [];
var errIdCnt = 0;
//url divs array
//error array - used to remove all the current errors

divArr = [];







// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
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

    search();
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
}

function search(queryTxt) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'id',
		q: queryTxt
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}









function hideErrorDiv(errorId)
{
	var displayState = document.getElementById(errorId).style.display;
	if(displayState == 'block')
	{
		document.getElementById(errorId).style.display = 'none';
	}
}
		
function showErrorDiv(errorId)
{
	var displayState = document.getElementById(errorId).style.display;
	if(displayState == 'none')
	{
		document.getElementById(errorId).style.display = 'block';
	}
}

function eraseTextFld(id)
{
	document.getElementById(id).value = '';
}


function throwError(errStr, err)
{
	errorIdCurShown[errIdCnt] = err;
	errIdCnt = errIdCnt + 1;

	errId = "errBox-"+err;
	errObj = document.getElementById(errId);
	var displayState = errObj.style.display;
	if(displayState == 'none')
	{
		errObj.style.display = 'block';
	}
	errObj.innerHTML = "*"+errStr;
}

function clearErrorsBeingShown()
{
	var len = errorIdCurShown.length;
	for(var i = 0; i < len ; i++)
	{
		var err = errorIdCurShown.pop();
		var errId = "errBox-" + err;
		var fldId = "field-" + err;
		
		var parentObj = document.getElementById(fldId);
		var errObj = document.getElementById(errId);
		if(parentObj && errObj)
		{
			errObj.innerHTML = "";
		}
	}
	errIdCnt = 0;
}

function validateYoutubeURL(urlId, errorId)
{	
	var urlObj = document.getElementById(urlId);
	var url = urlObj.value;
	
	if(url)
	{
		if(url.indexOf("youtube.com/watch?v") > -1)
		{
			
		}
		else
		{
			throwError("Error: invalid youtube URL", errorId);			
			eraseTextFld(urlId);
			return 0;
		}
	}
	else
	{
		throwError("Error: empty URL field",errorId);
	}		
	
}


function addFirstLoopDiv()
{

	clearErrorsBeingShown();

	var divId = loopDivCount;
	
	divArr.push(divId);
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	field.appendChild(txt);
	
	var element = document.createElement("input");	
	element.id = "videoUrl-" + loopDivCount;	
	element.size = "35";
	field.appendChild(element);
		
	field.appendChild(document.createTextNode(" ")); //adding little space
	
	var txt2 = document.createTextNode(", Loop Count: ");
	txt2.id = 'txt2-' + loopDivCount;
	field.appendChild(txt2);
	
	
	var loopCounter = document.createElement("input");
	loopCounter.id = "cntr-" + loopDivCount;
	loopCounter.type = "number";
	loopCounter.size = "2";
	loopCounter.min = "0";
	loopCounter.max = "20";
	loopCounter.value = "1";
	field.appendChild(loopCounter);	
	var closeButton = document.createElement("button");
	closeButton.class = "close";
	closeButton.id = "clsBt-"+loopDivCount;
	closeButton.onclick = function() {closeLoopDiv(divId)};
	var t = document.createTextNode('x');
	closeButton.appendChild(t);
	field.appendChild(closeButton);

	
	var errorBox = document.createElement("div");
	errorBox.class = "error";
	errorBox.id = "errBox-" + divId;
	field.appendChild(errorBox);
	
	var br = document.createElement("br");
	br.id = "br-" + loopDivCount;
	field.appendChild(br);
	
	document.getElementById("loopMain").appendChild(field);
}

function addLoopDiv()
{

	//remove existing errors being shown on screen
	clearErrorsBeingShown();

	loopDivCount = loopDivCount + 1;
	curCount = curCount + 1;
	
	var divId = loopDivCount;
	
	divArr.push(divId);
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	field.appendChild(txt);
	
	var element = document.createElement("input");	
	element.id = "videoUrl-" + loopDivCount;	
	element.size = "35";
	field.appendChild(element);
		
	field.appendChild(document.createTextNode(" ")); //adding little space
	
	var txt2 = document.createTextNode(", Loop Count: ");
	txt2.id = 'txt2-' + loopDivCount;
	field.appendChild(txt2);
	
	
	var loopCounter = document.createElement("input");
	loopCounter.id = "cntr-" + loopDivCount;
	loopCounter.type = "number";
	loopCounter.size = "2";
	loopCounter.min = "0";
	loopCounter.max = "20";
	loopCounter.value = "1";
	field.appendChild(loopCounter);	
	var closeButton = document.createElement("button");
	closeButton.class = "close";
	closeButton.id = "clsBt-"+loopDivCount;
	closeButton.onclick = function() {closeLoopDiv(divId)};
	var t = document.createTextNode('x');
	closeButton.appendChild(t);
	field.appendChild(closeButton);

	
	var errorBox = document.createElement("div");
	errorBox.class = "error";
	errorBox.id = "errBox-" + divId;
	field.appendChild(errorBox);
	
	var br = document.createElement("br");
	br.id = "br-" + loopDivCount;
	field.appendChild(br);
	
	document.getElementById("loopMain").appendChild(field);
}


function closeLoopDiv(requestedLoopDivCount)
{
	if(curCount == 1)
	{
		throwError("Cannot remove the only existing URL box",requestedLoopDivCount);
		return 0;
	}
		
	var idx = divArr.indexOf(requestedLoopDivCount);
	if(idx > -1)
	{
		divArr[idx] = 0;
	}
		
	var parentObj = document.getElementById('loopMain');
	
	parentObj.removeChild(document.getElementById('field-'+requestedLoopDivCount));
	
	curCount = curCount - 1;
	
}

function runVideoLoopCountTimes(loopDivId)
{
	var loopCount = document.getElementById("cntr-"+loopDivId).value;
	var url = document.getElementById("videoUrl-"+loopDivId).value;
	var videoBoxObj = document.getElementById("videoBox");
	var i;
	var strsplit = url.split("=");
	var newUrl = "http://www.youtube.com/embed/" + strsplit[1] + "?autoplay=true";
	for(i=0;i<loopCount;i++)
	{
		videoBoxObj.src = newUrl;
	}
}

function playVideoOnBox()
{
	var videoBoxObj = document.getElementById("videoBox");
	
	var len = divArr.length;
	var i;
	for(i=0;i<len;i++)
	{
		if(divArr[i]!=0)
		{
			runVideoLoopCountTimes(divArr[i]);
		}
	}
	
	//var url = document.getElementById("videoUrl-"+"1").value;
	//var strsplit = url.split("=");
	//var newUrl = "http://www.youtube.com/embed/" + strsplit[1] + "?autoplay=true";
	//videoBoxObj.src = newUrl;
	
}




function youtubeSearch()
{
	var sbInpObj = document.getElementById('searchBoxInp');
	var searchTxt = sbInpObj.value;
	search();
	if(searchTxt)
	{
		$.getScript("youtubeApi.js", function(){
			alert("hello");
			search(searchTxt);
		});
		
	}
}



