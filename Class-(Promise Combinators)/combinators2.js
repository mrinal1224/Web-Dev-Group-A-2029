// Race and Any

function fetchFromOpenWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No data"), 100)
  );
}

function fetchFromWeatherAPI() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No Data"), 700)
  );
}

function fetchFromAccuWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No Data"), 1200)
  );
}

// Promise.race([
//   fetchFromOpenWeather(),
//   fetchFromWeatherAPI(),
//   fetchFromAccuWeather(),
// ]).then(function (result) {
//   console.log(result);
// }).catch(function(err){
//     console.log(err)
// });




Promise.any([
    fetchFromOpenWeather(),
    fetchFromWeatherAPI(),
    fetchFromAccuWeather(),
  ]).then(function (result) {
    console.log(result);
  }).catch(function(err){
      console.log(err)
  });
