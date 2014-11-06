
var loopDivCount = 1;  //divId
var curCount = 1; //number of divs present

var errorIdCurShown = [];
var errIdCnt = 0;
//url divs array
//error array - used to remove all the current errors

divArr = [];


var searchResultsResponse = "";


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


function scrollToParticularDiv(divId)
{
	document.getElementById(divId).scrollIntoView();
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



function parseSearchResponse(response)
{
	obj = JSON.parse(response);
	var i;
	
	for(i=0;i<5;i++)
	{
		var title = obj.items[i].snippet.title;
		var thumbnail = obj.items[i].snippet.thumbnails.medium;
		var url = "https://www.youtube.com/watch?v=" + obj.times[i].id.videoId;
		var videoDescr = obj.items[i].snippet.description;
		var uploaderInfo = obj.items[i].snippet.channelTitle;
		oneSearchResult(url, thumbnail, title, uploaderInfo, videoDescr);
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
			searchResultsResponse = document.getElementById('response').innerHTML;
			searchResultsResponse = "{
  "kind": "youtube#searchListResponse",
  "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/-_SYwm_t0z7nE8oGXpwVJIEUVRc\"",
  "nextPageToken": "CAUQAA",
  "pageInfo": {
    "totalResults": 811484,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/J8Jz-kD7Lar0XcVfTy-bujblq-o\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "6KQPhoCICcs"
      },
      "snippet": {
        "publishedAt": "2011-09-26T15:25:17.000Z",
        "channelId": "UCVZ2J_VJlGHOvM9ie99QTPw",
        "title": "asd movie",
        "description": "ALL EPISODES.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/6KQPhoCICcs/default.jpg"
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/6KQPhoCICcs/mqdefault.jpg"
          },
          "high": {
            "url": "https://i.ytimg.com/vi/6KQPhoCICcs/hqdefault.jpg"
          }
        },
        "channelTitle": "chicken1761998",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/_ssTcJJiWZbNMe1KCk-Xh0AjBw0\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "zPryQqm7-CA"
      },
      "snippet": {
        "publishedAt": "2009-12-06T19:29:39.000Z",
        "channelId": "UCxW_N2764ykSszv_78ZHbag",
        "title": "Afrob - ASD Comeback feat. Samy Deluxe",
        "description": "Afrob - ASD Comeback feat. Samy Deluxe.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/zPryQqm7-CA/default.jpg"
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/zPryQqm7-CA/mqdefault.jpg"
          },
          "high": {
            "url": "https://i.ytimg.com/vi/zPryQqm7-CA/hqdefault.jpg"
          }
        },
        "channelTitle": "toonTwo",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/HbuCs-po3BQAknwWodx2l3kZ0UY\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "PbQhiv6OB0E"
      },
      "snippet": {
        "publishedAt": "2009-09-03T11:09:09.000Z",
        "channelId": "UCvoIc2xEKDxazN4n_fvO59A",
        "title": "Secundum ASD Atrial Septal Defect Repair",
        "description": "Redmond Burke MD, Chief of Pediatric Cardiovascular Surgery at Miami Children's Hospital demonstrates an operative technique for atrial septal defect or ASD.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/PbQhiv6OB0E/default.jpg"
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/PbQhiv6OB0E/mqdefault.jpg"
          },
          "high": {
            "url": "https://i.ytimg.com/vi/PbQhiv6OB0E/hqdefault.jpg"
          }
        },
        "channelTitle": "Redmond111",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/zr7kERK-G3QA9KoYjCSc6XAGGuQ\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "_G2sO1ikcKY"
      },
      "snippet": {
        "publishedAt": "2012-12-22T16:03:33.000Z",
        "channelId": "UCDUy9ybZtu_7FIHDwygCMbw",
        "title": "ASD - Ich und Er",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/_G2sO1ikcKY/default.jpg"
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/_G2sO1ikcKY/mqdefault.jpg"
          },
          "high": {
            "url": "https://i.ytimg.com/vi/_G2sO1ikcKY/hqdefault.jpg"
          }
        },
        "channelTitle": "freeza1606",
        "liveBroadcastContent": "none"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/IO-BTiLAgHhL4esdv4_YjQOvKpM\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "SU-7946HlMw"
      },
      "snippet": {
        "publishedAt": "2011-08-21T14:53:58.000Z",
        "channelId": "UCbqNXYABz1Wl8GYmhZmaUkQ",
        "title": "Explaining Autism to Children:  ASD and Me",
        "description": "http://www.facebook.com/ASDandMe My daughter, Anna (age 4), and my son, Donnie (age 7), narrated this video. They did such a great job and I am so proud ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/SU-7946HlMw/default.jpg"
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/SU-7946HlMw/mqdefault.jpg"
          },
          "high": {
            "url": "https://i.ytimg.com/vi/SU-7946HlMw/hqdefault.jpg"
          }
        },
        "channelTitle": "ASDandMe",
        "liveBroadcastContent": "none"
      }
    }
  ],
  "result": {
    "kind": "youtube#searchListResponse",
    "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/-_SYwm_t0z7nE8oGXpwVJIEUVRc\"",
    "nextPageToken": "CAUQAA",
    "pageInfo": {
      "totalResults": 811484,
      "resultsPerPage": 5
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/J8Jz-kD7Lar0XcVfTy-bujblq-o\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "6KQPhoCICcs"
        },
        "snippet": {
          "publishedAt": "2011-09-26T15:25:17.000Z",
          "channelId": "UCVZ2J_VJlGHOvM9ie99QTPw",
          "title": "asd movie",
          "description": "ALL EPISODES.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/6KQPhoCICcs/default.jpg"
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/6KQPhoCICcs/mqdefault.jpg"
            },
            "high": {
              "url": "https://i.ytimg.com/vi/6KQPhoCICcs/hqdefault.jpg"
            }
          },
          "channelTitle": "chicken1761998",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/_ssTcJJiWZbNMe1KCk-Xh0AjBw0\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "zPryQqm7-CA"
        },
        "snippet": {
          "publishedAt": "2009-12-06T19:29:39.000Z",
          "channelId": "UCxW_N2764ykSszv_78ZHbag",
          "title": "Afrob - ASD Comeback feat. Samy Deluxe",
          "description": "Afrob - ASD Comeback feat. Samy Deluxe.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/zPryQqm7-CA/default.jpg"
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/zPryQqm7-CA/mqdefault.jpg"
            },
            "high": {
              "url": "https://i.ytimg.com/vi/zPryQqm7-CA/hqdefault.jpg"
            }
          },
          "channelTitle": "toonTwo",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/HbuCs-po3BQAknwWodx2l3kZ0UY\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "PbQhiv6OB0E"
        },
        "snippet": {
          "publishedAt": "2009-09-03T11:09:09.000Z",
          "channelId": "UCvoIc2xEKDxazN4n_fvO59A",
          "title": "Secundum ASD Atrial Septal Defect Repair",
          "description": "Redmond Burke MD, Chief of Pediatric Cardiovascular Surgery at Miami Children's Hospital demonstrates an operative technique for atrial septal defect or ASD.",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/PbQhiv6OB0E/default.jpg"
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/PbQhiv6OB0E/mqdefault.jpg"
            },
            "high": {
              "url": "https://i.ytimg.com/vi/PbQhiv6OB0E/hqdefault.jpg"
            }
          },
          "channelTitle": "Redmond111",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/zr7kERK-G3QA9KoYjCSc6XAGGuQ\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "_G2sO1ikcKY"
        },
        "snippet": {
          "publishedAt": "2012-12-22T16:03:33.000Z",
          "channelId": "UCDUy9ybZtu_7FIHDwygCMbw",
          "title": "ASD - Ich und Er",
          "description": "",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/_G2sO1ikcKY/default.jpg"
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/_G2sO1ikcKY/mqdefault.jpg"
            },
            "high": {
              "url": "https://i.ytimg.com/vi/_G2sO1ikcKY/hqdefault.jpg"
            }
          },
          "channelTitle": "freeza1606",
          "liveBroadcastContent": "none"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/IO-BTiLAgHhL4esdv4_YjQOvKpM\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "SU-7946HlMw"
        },
        "snippet": {
          "publishedAt": "2011-08-21T14:53:58.000Z",
          "channelId": "UCbqNXYABz1Wl8GYmhZmaUkQ",
          "title": "Explaining Autism to Children:  ASD and Me",
          "description": "http://www.facebook.com/ASDandMe My daughter, Anna (age 4), and my son, Donnie (age 7), narrated this video. They did such a great job and I am so proud ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/SU-7946HlMw/default.jpg"
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/SU-7946HlMw/mqdefault.jpg"
            },
            "high": {
              "url": "https://i.ytimg.com/vi/SU-7946HlMw/hqdefault.jpg"
            }
          },
          "channelTitle": "ASDandMe",
          "liveBroadcastContent": "none"
        }
      }
    ]
  }
}";
			parseSearchResponse(searchResultsResponse);
		});
		
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

function populateSearchResultsList()
{
	
}


