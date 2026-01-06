let a = 5;

let b = 7;

console.log(a); // 5

function sayHello() {
  for (let i = 0; i < 10; i++) {
    console.log("hello");
  }
}

function sayBye() {
  for (let i = 0; i < 10; i++) {
    console.log("bye");
  }
}

//sayHello() // hello

// setTimeout

setTimeout(sayHello , 6000);
setTimeout(sayBye  , 3000);

console.log(b); // 7

//5
