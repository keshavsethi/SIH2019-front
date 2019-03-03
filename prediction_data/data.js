$(document).ready(function() {
  $('#loading').hide();
  var location,
    formatTime,
    longitude,
    latitude,
    listStr,
    windowInfo,
    notice,
    detail;

  $('#getGeoData').click(function() {
    $('#loading').show();
    var starttime = $('#startDate').val() || new Date().toISOString();
    var endtime = $('#endDate').val() || new Date().toISOString();

    console.info('Contacting USGS for Data');

    $.ajax({
      url: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + starttime + '&endtime=' + endtime + '',
      error: function(err) {
        console.error(err);
        $('#loading').text(err || 'Request took too long to respond.');
      },
      success: function(geodata) {
        $('#loading').hide();
        initMap();
        console.log('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + starttime + '&endtime=' + endtime + '');
        console.log(geodata);
        // Displays location and time for each event
        geodata.features.forEach(function(feature) {

          location = feature.properties.place;
          formatTime = new Date(feature.properties.time);
          longitude = feature.geometry.coordinates[0];
          latitude = feature.geometry.coordinates[1];
          depth = feature.geometry.coordinates[2];
          notice = feature.properties.alert || "None";
          detailLink = feature.properties.url;
          kmlLink = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=kml&starttime=' + starttime + '&endtime=' + endtime + '';

          var marker = new google.maps.Marker({
            "position": {
              "lat": latitude,
              "lng": longitude
            },
            "lng": longitude,
            "lat": latitude,
            "formatTime": formatTime,
            "notice": notice,
            "map": map,
            "title": location,
            "link": detailLink,
            "kml": kmlLink
          });

          marker.addListener('click', function() {
            createInfoWindow(this).open(map, this);
          });

          listStr = "<li class='list-group-item' data-lng='" + longitude + "' data-lat='" + latitude
                + "' data-time='" + formatTime + "' data-loc='" + location + "' data-notice='" + notice
                + "' data-link='" + detailLink + "' >" + "Location: " + location + "<br>Time: " + formatTime + "</li>";
          $('#display').append(listStr);

        });
        // Let jQuery add the click handlers to the <li>s
        $('#display').delegate('li', 'click', function() {
          $('.active').removeClass('active');
          $(this).addClass('active');
          window.scrollTo(0, 0);
          // createInfoWindow(marker).open(map, marker);
          var lng = $(this).data('lng');
          var lat = $(this).data('lat');
          var time = $(this).data('time');
          var loc = $(this).data('loc');
          var note = $(this).data('notice');
          var link = $(this).data('link');
          console.log("DATA: " + lng + lat + time + loc)
            // Marker object to pass to createInfoWindow function
            // The Marker is not an actual marker but the structure of the data
            // needed is the same, so createInfoWindow can be reused.
          var marker = {
            "position": {
              "lat": lat,
              "lng": lng
            },
            "lng": lng,
            "lat": lat,
            "formatTime": time,
            "notice": notice,
            "title": loc,
            "link": link,
            "kml": kmlLink
          }
          createInfoWindow(marker).open(map);
          console.log("MARKER: " + marker.lat);
        });
      },
    });
  });
});
// Initializes Google Map
function initMap() {
  var myLatLng = {
    lat: 11.7400867,
    lng: 92.6586401
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
}
// Assigns colored label to different alert
function makeAlertLabel(alert) {
  if (!alert)
    return 'None';
  switch (alert.toLowerCase()) {
    case 'green':
      return "<span class='label label-success'>" + alert.toUpperCase() + "</span>";
    case 'yellow':
      return "<span class='label label-warning'>" + alert.toUpperCase() + "</span>";
    case 'red':
      return "<span class='label label-danger'>" + alert.toUpperCase() + "</span>";
    default:
      return 'None';
  }
}
// Shows info window content
function createInfoWindow(marker) {
  windowInfo = "<h2>" + marker.title + "</h2>" + "<div id='alert'>ALERT: " + makeAlertLabel(marker.notice) + "</div>"
            + "<div class='info'> <b>Time: </b>" + marker.formatTime + "<br><b>Longitude: </b>" + marker.lng
            + "<br><b>Latitude: </b>" + marker.lat + "<br><a href='" + marker.link + "'target='_blank'>Event Link</a>"
            + "<br><a href='" + marker.kml + "'>Download KML File</a></div>";
  return new google.maps.InfoWindow({
    content: windowInfo,
    position: {
      mag:marker.mag,
      lat: marker.lat,
      lng: marker.lng
    },
  });
}

function sendfunc(){
var depth = document.getElementById("depth").value;
var  magt;
var mage=document.getElementById("mag").value;
magt = (2.61*mage)-18.44;
var distance;
distance = depth/(Math.exp(0.12*magt+2.12));

document.getElementById("ans").innerHTML=distance;
console.log(distance);
}
