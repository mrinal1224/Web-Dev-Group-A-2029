const fileSystem = require("fs");


console.log("start")


const readFilePromise1 = fileSystem.promises.readFile("f1.txt");
const readFilePromise2 = fileSystem.promises.readFile("f2.txt");
const readFilePromise3 = fileSystem.promises.readFile("f3.txt");

// handlers

readFilePromise1
  .then(function (data) {
    console.log("file 1 Data -> " + data);
  })
  .catch(function (err) {
    console.log("File Cannot be read due to -> " + err);
  });


  readFilePromise2
  .then(function (data) {
    console.log("file 2 Data -> " + data);
  })
  .catch(function (err) {
    console.log("File Cannot be read due to -> " + err);
  });


  readFilePromise3
  .then(function (data) {
    console.log("file 3 Data -> " + data);
  })
  .catch(function (err) {
    console.log("File Cannot be read due to -> " + err);
  });



  console.log("End")
