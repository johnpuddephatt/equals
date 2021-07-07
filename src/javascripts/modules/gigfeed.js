import Mustache from '../vendor/mustache.min.js';

export default class Gigfeed {

  constructor(el) {
    var script = document.createElement('script');
    document.querySelector('head').appendChild(script);
    script.src = '//gigs.gigatools.com/u/Equals.json?callback=gigadata';

    window.gigadata = function(data) {
      var template =  "<ul>{{#.}}" +
                      "<li><a href='{{event.url_tix}}'>"+
                      "{{event.name}}<span class='show-time'>{{event.eventdate}} • {{event.city}}</span>" +
                      "</a></li>" +
                      "{{/.}}</ul>" +
                      "{{^.}}<p>No upcoming shows right now.</p>{{/.}}";
      var html = Mustache.render(template, data[1]);
      window.addEventListener('load', function(){
        var gigInner = document.querySelector('.gig-inner');
        gigInner.innerHTML = html;
      }, false);

    }
  }
}