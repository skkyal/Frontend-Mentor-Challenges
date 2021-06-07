//setting up map
var customIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [40, 50], // size of the icon
  iconAnchor: [20, 49], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var mymap = L.map("mapid");
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    minZoom: 3,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
  }
).addTo(mymap);

//var mymap = L.map("mapid").setView([34.04915, -118.09462], 18);
const setMap = (lat, lon) => {
  mymap.setView([lat, lon], 16);
  var marker = L.marker([lat, lon], { icon: customIcon }).addTo(mymap);
};

// button click
const getDetails = () => {
  const ipAddress = document.querySelector("#search").value;
  //console.log(ipAddress);
  fetch(
    "https://geo.ipify.org/api/v1?" +
      new URLSearchParams({
        apiKey: API_KEY,
        ipAddress: ipAddress,
      })
  )
    .then((response) => response.json())
    .then((json) => {
      const { ip, isp, location } = json;
      // console.log(json);
      document.getElementById("a1").innerHTML = ip;
      document.getElementById("a2").innerHTML =
        location.city + ", " + location.country;
      document.getElementById("a3").innerHTML = "UTC " + location.timezone;
      document.getElementById("a4").innerHTML = isp;

      setMap(location.lat, location.lng);
    })
    .catch(() => console.log("Error"));

  return false;
};
getDetails();
