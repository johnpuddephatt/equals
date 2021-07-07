import SC from '../vendor/sc-api.min.js';
//import YT from '../vendor/yt-api.min.js';
import YouTubePlayer from 'youtube-player';


export default class Audioplayer {
  constructor(el) {

    var body = document.querySelector('body');
    var analyser, audioPlayer;

    var playButton = document.querySelector('.play-button');

    playButton.addEventListener('click', playButtonHandler, false);

    var barStrip = document.createElement('div');
    barStrip.classList.add('bar-list');
    var groups = [];

    for(var i=0;i<10;i++) {
      var bar = document.createElement('div');
      bar.classList.add('bar');
      barStrip.appendChild(bar);
      groups.push(bar);
    }

    function playButtonHandler(e) {
      if (e.target.classList.contains('playing')) {
        audioPlayer.pause();
        audioPlayer.remove();
        e.target.classList.remove('playing');
        body.removeChild(barStrip);
      }
      else {
        setupWebAudio();
        audioPlayer.currentTime= 0;
        audioPlayer.src = playButton.dataset.audio;
        audioPlayer.play();
        e.target.classList.add('playing');
        body.appendChild(barStrip);

      }
      e.stopPropagation();
    }


    /*
     * Created by Cameron Adams on 18th September 2012
     * More info here: http://themaninblue.com/writing/perspective/2012/09/18/
     *
     */


    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var audioContext = new AudioContext();

    window.addEventListener('load', init, false);

    function init() {
      setupWebAudio();
    	draw();
    }

    function setupWebAudio() {
      if (source) source.disconnect();
      if (audioPlayer) audioPlayer.remove();

      audioPlayer = new Audio();
      audioPlayer.crossOrigin = "anonymous";
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 32;
      var source = audioContext.createMediaElementSource(audioPlayer);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    }



    // Draw the audio frequencies to screen
    function draw() {
    	// Setup the next frame of the drawing
      requestAnimationFrame(draw);
      // Create a new array that we can copy the frequency data into
    	var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    	// Copy the frequency data into our new array
    	analyser.getByteFrequencyData(freqByteData);
    	// For each "bucket" in the frequency data, draw a line corresponding to its magnitude
    	for (var i = 0; i < groups.length; i++) {
        groups[i].style.opacity = freqByteData[i]/255 * .50;
    	}
    }

    var scIframe = document.getElementById('sc-widget'),
        scWidget = window.SC.Widget(scIframe);

    scWidget.bind(window.SC.Widget.Events.PLAY, function() {
        pausePlayer();
    });

    function pausePlayer() {
      if (playButton.classList.contains('playing')) {
        audioPlayer.pause();
        audioPlayer.remove();
        playButton.classList.remove('playing');
        body.removeChild(barStrip);
      }
    }

    var yts = document.querySelectorAll('.yt-widget');
    for(var i = 0; i < yts.length; i++) {
      var id = yts[i].dataset.id;
      window["player" + i] = YouTubePlayer(id, {
          videoId: id
      });
      window["player" + i].on('stateChange', function (event) {
        if(event.data == 1) {
          pausePlayer();
        }
      });
    }

  }
}
