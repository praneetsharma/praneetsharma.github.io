
var loopDivCount = 1;  //divId
var curCount = 1; //number of divs present

var errorIdCurShown = [];
var errIdCnt = 0;
//url divs array
//error array - used to remove all the current errors

divArr = [];


var searchResultsResponse = "";


var loopDivIdtoUrlMap = {};


jQuery(document).ready(function() {
  
  	$("#leftDiv").hover(
        function () {
          $("#leftDiv").animate({
            'marginLeft' : "-=30px"
          });
        
         },
  
        function () {
         $('#leftDiv').animate({
             'marginLeft' : "+=30px"
         }, 100, function () {
             $('#leftDiv').css({
                 display: 'block'
             });
         });
    });
  
});




function hideDiv(id)
{
	var displayState = document.getElementById(id).style.display;
	if(displayState != 'block')
	{
		document.getElementById(id).style.display = 'none';
	}
}


function showDiv(id)
{
	var displayState = document.getElementById(id).style.display;
	if(displayState == 'none')
	{
		document.getElementById(id).style.display = 'block';
	}
}


function hideErrorDiv(errorId)
{
	var displayState = document.getElementById(errorId).style.display;
	if(displayState != 'none')
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


function hideVideoBox(boxId)
{
	var displayState = document.getElementById(boxId).style.display;
	if(displayState != 'none')
	{
		document.getElementById(boxId).style.display = 'none';
	}
}


function showVideoBox(boxId)
{
	var displayState = document.getElementById(boxId).style.display;
	if(displayState == 'none')
	{
		document.getElementById(boxId).style.display = 'block';
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


function scrollToParticularDiv(divId)
{
	$("loopMain").animate({
         scrollTop: $("#"+divId).offset().top - 100
     }, 300);
	//$('body').scrollTo('#'+divIdn,{duration:'slow', offsetTop : '50'});
	//document.getElementById(divId).scrollIntoView();
}

function highlightDiv(divId)
{
	var divIdXtra = '#'+divId;
	$(divIdXtra).effect('highlight',{},1000); 
}

function addFirstLoopDiv()
{

	clearErrorsBeingShown();

	var divId = loopDivCount;
	
	divArr.push(divId);
	
	var superLocalDiv = document.createElement('div');
	superLocalDiv.id = 'localLoopDiv-' + loopDivCount;
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	//field.appendChild(txt);
	
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
	
	field.appendChild(document.createTextNode(", skip this: "));
	
	var uncheckVideo = document.createElement("input");
	uncheckVideo.type="checkbox";
	uncheckVideo.value="skip Video";	
	field.appendChild(uncheckVideo);
	
	field.appendChild(document.createTextNode("          "));
	
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
	
	superLocalDiv.appendChild(field);
	
	document.getElementById("loopMain").appendChild(superLocalDiv);
	
	//scrollToParticularDiv('field-'+divId);
	
	highlightDiv('localLoopDiv-'+divId);
	
	
}

function addLoopDiv()
{

	//remove existing errors being shown on screen
	clearErrorsBeingShown();

	loopDivCount = loopDivCount + 1;
	curCount = curCount + 1;
	
	var divId = loopDivCount;
	
	divArr.push(divId);
	
	var superLocalDiv = document.createElement('div');
	superLocalDiv.id = 'localLoopDiv-' + loopDivCount;
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	//field.appendChild(txt);
	
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
	
	field.appendChild(document.createTextNode(", skip this: "));
	
	var uncheckVideo = document.createElement("input");
	uncheckVideo.type="checkbox";
	uncheckVideo.value="skip Video";	
	field.appendChild(uncheckVideo);
	
	field.appendChild(document.createTextNode("          "));
	
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
	
	superLocalDiv.appendChild(field);
	
	document.getElementById("loopMain").appendChild(superLocalDiv);
	
	scrollToParticularDiv('field-'+divId);
	
	highlightDiv('localLoopDiv-'+divId);
	
}



function addLoopDivSpcl(url)
{
	//remove existing errors being shown on screen
	clearErrorsBeingShown();

	loopDivCount = loopDivCount + 1;
	curCount = curCount + 1;
	
	var divId = loopDivCount;
	
	divArr.push(divId);
	
	var superLocalDiv = document.createElement('div');
	superLocalDiv.id = 'localLoopDiv-' + loopDivCount;
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	//field.appendChild(txt);
	
	var element = document.createElement("input");	
	element.id = "videoUrl-" + loopDivCount;	
	element.size = "35";
	element.value = url;
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
	
	field.appendChild(document.createTextNode(", skip this: "));
	
	var uncheckVideo = document.createElement("input");
	uncheckVideo.type="checkbox";
	uncheckVideo.value="skip Video";	
	field.appendChild(uncheckVideo);
	
	field.appendChild(document.createTextNode("          "));
	
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
	
	superLocalDiv.appendChild(field);
	
	document.getElementById("loopMain").appendChild(superLocalDiv);
	
	scrollToParticularDiv('field-'+divId);
	
	highlightDiv('localLoopDiv-'+divId);
	
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
	
	parentObj.removeChild(document.getElementById('localLoopDiv-'+requestedLoopDivCount));
	
	curCount = curCount - 1;
	
}







function addUrlToMap(url)
{
	
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
	hideDiv("singleSearchResult");
	
	showVideoBox("videoBox");
	
	
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
	
}




function youtubeSearch()
{

	scrollToParticularDiv('searchResultsList');

	var sbInpObj = document.getElementById('searchBoxInp');
	var searchTxt = sbInpObj.value;
	if(searchTxt)
	{
		$.getScript("http://praneetsharma.github.io/javascripts/youtubeApi.js", function(){
			searchResultsResponse = search(searchTxt);
		});
		
	}
}



function populateSearchResultsList()
{
	
}


