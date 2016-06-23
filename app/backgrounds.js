(function(win, doc) {
  'use strict';
  var $ = doc.querySelector.bind(doc);

  // Long list of images
  // 'img/' gets added on automatically
  var data_images = [
    'AlpineFly.png',
	'logo.png'
  ];

  function initBackgrounds() {
    changeImage();
    changeNextImage();

    setInterval(function() {
      doImageFadeIn();
    }, 60000);
  }

  /**
   * Set the background to a random image
   */
  function changeImage() {
    var img = data_images[nextBgIndex];
    if (img.src)
      $('body').style.backgroundImage = 'url(img/' + img.src + ')';
    else
      $('body').style.backgroundImage = 'url(img/' + img + ')';

    var artist = $('.artist');
    if (!artist) {
      artist = doc.createElement('h4');
      artist.classList.add('artist');
      artist.classList.add('center');
      $('.main-container').appendChild(artist);
    }
    if (img.artist)
      artist.innerHTML = 'Artist: ' + img.artist;
    else
      artist.innerHTML = '';
  }

  function changeNextImage() {
    nextBgIndex = Math.floor(Math.random() * data_images.length);

    var img = data_images[nextBgIndex];
    if (img.src)
      $('.bg').style.backgroundImage = 'url(img/' + img.src + ')';
    else
      $('.bg').style.backgroundImage = 'url(img/' + img + ')';
  }

  function doImageFadeIn(index) {
    if (index)
      nextBgIndex = index;

    var bg = $('.bg');
    var body = $('body');
    bg.style.opacity = '';
    bg.classList.add('fadein');


    setTimeout(function() {
      bg.style.opacity = 0;
      bg.classList.remove('fadein');
      changeImage();
      changeNextImage();

    }, 1000);
  }

  var nextBgIndex = Math.floor(Math.random() * data_images.length);

  if (doc.readyState !== 'loading')
    initBackgrounds();
  else
    win.addEventListener('load', function() {
      initBackgrounds();
    });

})(window, document);
