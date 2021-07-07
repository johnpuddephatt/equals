import SC from '../vendor/sc-api.min.js';

export default class Soundcloud {

  constructor(el) {

    var widgetIframe = document.getElementById('sc-widget'),
        widget       = window.SC.Widget(widgetIframe);

    widget.bind(window.SC.Widget.Events.READY, function() {
      widget.bind(window.SC.Widget.Events.PLAY, function() {
        // get information about currently playing sound
        console.log('play');
        audioPlayer.pause();

      });
    });

  }
}