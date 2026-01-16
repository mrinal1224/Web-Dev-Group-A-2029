// Async/Await

const p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Promise 1 Resolved");
  }, 10000);
});

const p2= new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Promise 2 Resolved");
  }, 5000);
});

// p1.then(function (result) {
//   console.log(result);
// });

 async function sayHello() {
  console.log("scaler"); // 1

  const result1 = await p1; // 10 seconds - suspend
  console.log(result1);

  const result2 = await p2; // 5 sec
  console.log(result2);

  console.log("Create Impact");
}

function sayBye() {
  console.log("Bye");
}

sayHello();
sayBye();
