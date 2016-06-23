(function(win, doc) {
  'use strict';
  var $ = doc.querySelector.bind(doc);

  function initAudio() {
    // Get preferences from local storage
	localStorage.setItem('nms-autoplay', true);
    if (localStorage) {
      if (localStorage.getItem('nms-autoplay'))
        toggleAudio();
      if (localStorage.getItem('nms-repeat'))
        toggleShuffle();
    }
    // Add buton click listeners
    //$('.button-next').addEventListener('click', changeAudio);
    $('.button-play').addEventListener('click', toggleAudio);
    //$('.button-shuffle').addEventListener('click', toggleShuffle);
    $('.button-volUp').addEventListener('click', volUp);
    $('.button-volDown').addEventListener('click', volDown);
    shuffleAudio();
    changeAudio();
  }

  /**
   * Mix up the playlist, or set it back to straight
   */
  function shuffleAudio() {
    var newPl = [];

    // If we're shuffling
    if (doc.querySelector('.repeat-svg.hidden')) {
      // Add songs to temporary list
      var tempPl = [];
      data_songs.forEach(function(song) {
        tempPl.push(song);
      });
      // Take a random song out, put in new list
      while (tempPl.length > 0) {
        var index = Math.floor(Math.random() * tempPl.length);
        newPl.push(tempPl[index]);
        tempPl.splice(index, 1);
      }

      ga('send', 'event', 'Music-Shuffle', 'shuffle');
    } else {
      // Put songs in list in order
      data_songs.forEach(function(song) {
        newPl.push(song);
      });
      ga('send', 'event', 'Music-Shuffle', 'loop');
    }

    playlist = newPl;
  }

  /**
   * Change the song to the next one in the list
   */
  function changeAudio() {
    currSongIndex++;
    // If we've gone too far, recreate the playlist
    if (currSongIndex == playlist.length) {
      currSongIndex = 0;
      shuffleAudio();
    }

    // If the player doesn't exist yet, create it
    if (!player) {
      player = doc.createElement('audio');
      // Set volume if stored
      if (localStorage)
        player.volume = localStorage.getItem('nms-vol') || 0.5;
      // Add listeners
      player.addEventListener('ended', changeAudio);
      player.addEventListener('timeupdate', changeAudioProgress);
    }

    // Set player source, and artist information
    player.src = 'audio/' + playlist[currSongIndex].src;
    $('.song-title').innerHTML = playlist[currSongIndex].title;
    $('.song-artist').innerHTML = playlist[currSongIndex].artist;
    $('.song-artist-link').href = playlist[currSongIndex].artistLink;
    $('.progress-bar').style.width = 0;

    ga('send', 'event', 'Music-Song', 'next', playlist[currSongIndex].artist + ' - ' + playlist[currSongIndex].title);

    if ($('.play-svg.hidden'))
      player.play();
  }

  /**
   * Toggle play state
   */
  function toggleAudio() {
    var playSVG = doc.querySelector('.play-svg');
    var pauseSVG = doc.querySelector('.pause-svg');
    // If we should play
    if (pauseSVG.classList.contains('hidden')) {
      // Play is player exists
      if (player) {
        player.play();
        ga('send', 'event', 'Music-Toggle', 'play');
      }
      // Store autoplay
      if (localStorage)
        localStorage.setItem('nms-autoplay', true);
    } else {
      // Pause of player exists
      if (player) {
        player.pause();
        ga('send', 'event', 'Music-Toggle', 'pause');
      }
      // Remove autoplay from storage
      if (localStorage)
        localStorage.removeItem('nms-autoplay');
    }
    // Toggle which icon is visible
    playSVG.classList.toggle('hidden');
    pauseSVG.classList.toggle('hidden');
  }

  /**
   * Toggle playlist shuffling
   */
  function toggleShuffle() {
    var shuffleSVG = doc.querySelector('.shuffle-svg');
    var repeatSVG = doc.querySelector('.repeat-svg');
    // Toggle icons
    shuffleSVG.classList.toggle('hidden');
    repeatSVG.classList.toggle('hidden');

    // Store shuffle state
    if (localStorage)
      if (shuffleSVG.classList.contains('hidden'))
        localStorage.setItem('nms-repeat', true);
      else
        localStorage.removeItem('nms-repeat');

      // Recreate playlist
    shuffleAudio();
  }

  /**
   * Increase volume
   */
  function volUp() {
    // Cap at 1 (otherwise exception is thrown)
    var vol = Math.min(player.volume + 0.1, 1);
    player.volume = vol;

    // Store volume
    if (localStorage)
      localStorage.setItem('nms-vol', vol);
  }

  /**
   * Decrease volume
   */
  function volDown() {
    // Cap at 0 (otherwise exception thrown)
    var vol = Math.max(player.volume - 0.1, 0);
    player.volume = vol;

    // Store volume
    if (localStorage)
      localStorage.setItem('nms-vol', vol);
  }

  /**
   * Update the progress bar with song progress
   */
  function changeAudioProgress() {
    doc.querySelector('.progress-bar').style.width = ((player.currentTime / player.duration) * 100) + '%';
  }

  var playlist = [];
  var currSongIndex = 0;
  var player;

  var data_songs = [ {
    title: 'Eyes of the Sky',
    artist: 'JayKob',
    artistLink: 'https://soundcloud.com/jaykobmusic',
    src: 'JayKob/EyesOfTheSky.mp3'
  }];

  if (doc.readyState !== 'loading')
    initAudio();
  else
    win.addEventListener('DOMContentLoaded', function() {
      initAudio();
    });

})(window, document);
