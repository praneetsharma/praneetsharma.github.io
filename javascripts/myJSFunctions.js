
var loopDivCount = 1;  //divId
var curCount = 1; //number of divs present

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


function throwError(errStr, errId)
{
	errObj = document.getElementById(errId);
	var displayState = errObj.style.display;
	if(displayState == 'none')
	{
		errObj.style.display = 'block';
	}
	errObj.innerHTML = "*"+errStr;
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
	var divId = loopDivCount;
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	field.appendChild(txt);
	
	var element = document.createElement("input");	
	element.id = "videoUrl-" + loopDivCount;	
	element.size = "50";
	field.appendChild(element);
		
	field.appendChild(document.createTextNode(" ")); //adding little space
		
	var closeButton = document.createElement("button");
	closeButton.class = "close";
	closeButton.id = "clsBt-"+loopDivCount;
	closeButton.onclick = function() {closeLoopDiv(divId)};
	var t = document.createTextNode('x');
	closeButton.appendChild(t);
	field.appendChild(closeButton);

	
	var br = document.createElement("br");
	br.id = "br-" + loopDivCount;
	field.appendChild(br);
	
	document.getElementById("loopMain").appendChild(field);
}

function addLoopDiv()
{

	loopDivCount = loopDivCount + 1;
	curCount = curCount + 1;
	
	var divId = loopDivCount;
	
	var field = document.createElement('fieldset');
	field.id = 'field-' + loopDivCount;
	
	var txt = document.createTextNode("Enter valid youtube URL: ");
	txt.id = 'txt-' + loopDivCount;
	field.appendChild(txt);
	
	var element = document.createElement("input");	
	element.id = "videoUrl-" + loopDivCount;	
	element.size = "50";
	field.appendChild(element);
		
	field.appendChild(document.createTextNode(" ")); //adding little space
		
	var closeButton = document.createElement("button");
	closeButton.class = "close";
	closeButton.id = "clsBt-"+loopDivCount;
	closeButton.onclick = function() {closeLoopDiv(divId)};
	var t = document.createTextNode('x');
	closeButton.appendChild(t);
	field.appendChild(closeButton);

	
	var br = document.createElement("br");
	br.id = "br-" + loopDivCount;
	field.appendChild(br);
	
	document.getElementById("loopMain").appendChild(field);
}


function closeLoopDiv(requestedLoopDivCount)
{
	if(curCount == 1)
	{
		alert("error");
		throwError("Cannot remove the only URL box",'errorBox-'+requestedLoopDivCount);
		return 0;
	}
		
	
	var parentObj = document.getElementById('loopMain');
	
	parentObj.removeChild(document.getElementById('field-'+requestedLoopDivCount));
	
	curCount = curCount - 1;
	
}

