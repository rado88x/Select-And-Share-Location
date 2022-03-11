import axios from "axios";

declare var google: any;

const form = document.querySelector("form");
const adrressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_API_KEY = "AIzaSyB7NzUKNi10y1iufh91GbMWVanetxLiaj8";
// const GOOGLE_GEOLOCATION_API_URL =
//   "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY";
// const url =
//   "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyB7NzUKNi10y1iufh91GbMWVanetxLiaj8";
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = adrressInput.value;
  console.log(enteredAddress);

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 13,
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
      console.log(coordinates);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
}
form?.addEventListener("submit", searchAddressHandler);
