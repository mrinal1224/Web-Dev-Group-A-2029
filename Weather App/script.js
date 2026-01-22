// Promises , async Await

const searchForm = document.querySelector(".search-form");
const inputField = document.querySelector(".searchField");
const tempFiled = document.querySelector(".temp");
const locationField = document.querySelector(".location");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  target = inputField.value; // London
  fetchData(target);
});

let target = "Mumbai";

async function fetchData(location) {
  try {
    let res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=35af7ff606db422880d141328231305&q=${location}&aqi=no`
    );

    const data = await res.json(); // converts readableJsonStream to Js Objects

    console.log(data);

    tempFiled.innerText = data.current.temp_c;
    locationField.innerText = data.location.name;
  } catch (err) {
    alert('LOCATION NOT FOUND')
    console.log(err);
  }
}
