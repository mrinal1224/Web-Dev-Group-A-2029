
# 🚀 Full Stack LLD & Projects

## JavaScript-15: Asynchronous Programming 2 — **Promises (Beginner → Internals)**

---

## 🧭 Agenda

* What are Promises
* Why Promises exist (callbacks vs promises)
* Promise states & lifecycle
* Promise chaining (serial async)
* Concurrent async with Promises
* Microtask queue & Event Loop (Promises internals)
* Serial async with Promises
* Why Promises are better than callbacks

---

## 1️⃣ What Are Promises? (Beginner First)

### 📘 Definition (Simple Words)

> A **Promise** is an object that represents a value that will be available **in the future** — either successfully or with an error.

---

### 🤝 Real-Life Analogy: Promises in Life

When someone makes you a promise:

1. They don’t complete it immediately
2. You **wait**
3. After some time:

   * They **keep the promise** ✅
   * Or they **break the promise** ❌

No matter what happens, the promise **finishes**.

JavaScript works **exactly the same way**.

---

## 2️⃣ States of a Promise (Very Important)

Every Promise goes through these states:

| State                    | Meaning                               |
| ------------------------ | ------------------------------------- |
| **Pending**              | Promise is created, result not ready  |
| **Fulfilled (Resolved)** | Promise completed successfully        |
| **Rejected**             | Promise failed                        |
| **Settled**              | Promise finished (success or failure) |

📌 **Once a promise is settled, its state can NEVER change.**

---

## 3️⃣ Why Do We Need Promises?

### ❌ The Callback Problem (From Previous Class)

```js
fs.readFile("f1.txt", () => {
  fs.readFile("f2.txt", () => {
    fs.readFile("f3.txt", () => {
      // 😵 callback hell
    });
  });
});
```

Problems:

* Deep nesting
* Hard to read
* Hard to debug
* Error handling is messy

This problem is called:

## 💥 **Callback Hell**

---

### ✅ What Promises Fix

Promises give us:

* Flat structure
* Clear success & failure handling
* Sequential flow without nesting
* Centralized error handling

---

## 4️⃣ Creating a Promise (How It’s Born)

A Promise is created using the `Promise` constructor.

```js
let promise = new Promise(function (resolve, reject) {
  // async work
});
```

### Important Rules

* `resolve(value)` → success
* `reject(error)` → failure
* Executor function runs **immediately**
* Result is delivered **later**

---

## 5️⃣ Simple Promise Example (Coin Toss 🎲)

```js
let coinTossPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Heads");
    } else {
      reject("Tails");
    }
  }, 1000);
});
```

---

## 6️⃣ Consuming a Promise

Promises are consumed using:

* `.then()` → success
* `.catch()` → failure
* `.finally()` → always runs

```js
coinTossPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Toss completed"));
```

📌 **Promises separate logic cleanly** — success, failure, cleanup.

---

## 7️⃣ Promise Lifecycle (Internal View)

![Image](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

![Image](https://media2.dev.to/dynamic/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frywxmm88tzejejqhr8pg.png)

```
Promise Created
      ↓
   Pending
      ↓
 ┌─────────────┐
 │ resolve()   │ → Fulfilled
 │ reject()    │ → Rejected
 └─────────────┘
      ↓
   Settled
```

---

## 8️⃣ Promise Chaining (Serial Async Execution)

### Real-Life Story 🍦

To win ice cream:

1. Clean room
2. Remove garbage
3. THEN get ice cream

Each task depends on the previous one.

---

### Promise Version

```js
function cleanRoom() {
  return Promise.resolve("Cleaned room");
}

function removeGarbage(msg) {
  return Promise.resolve(msg + " → Garbage removed");
}

function winIceCream(msg) {
  return Promise.resolve(msg + " → Ice cream won 🍦");
}

cleanRoom()
  .then(removeGarbage)
  .then(winIceCream)
  .then(console.log)
  .catch(console.error);
```

📌 `.then()` **returns a new promise**, enabling chaining.

---

## 9️⃣ Error Handling in Promise Chains

### Key Rule (Memorize This)

> **If ANY promise fails, control jumps directly to `.catch()`**

```js
cleanRoom()
  .then(removeGarbage)
  .then(winIceCream)
  .catch(err => console.error("No Ice Cream 😢", err));
```

✔ No nested try/catch
✔ Single error handler
✔ Clean control flow

---

## 🔟 Reading Files Using Promises (Concurrent)

### Callback Version (Old Way)

```js
fs.readFile("f1.txt", cb);
```

---

### Promise Version (Modern Way)

```js
const fs = require("fs");

fs.promises.readFile("f1.txt")
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

📌 `fs.promises.readFile()` already returns a Promise.

---

## 1️⃣1️⃣ Reading Multiple Files (Concurrent)

```js
let f1 = fs.promises.readFile("f1.txt");
let f2 = fs.promises.readFile("f2.txt");
let f3 = fs.promises.readFile("f3.txt");

f1.then(console.log);
f2.then(console.log);
f3.then(console.log);
```

### Output Order ❓

❌ Not guaranteed
✔ Concurrent execution

---

## 1️⃣2️⃣ Why Order Is Random (Internals)

### Behind the Scenes (Important)

![Image](https://miro.medium.com/1%2AVJsawOs5rNQxQiJYzgwJxQ.png)

![Image](https://blog.softbinator.com/wp-content/uploads/14_Microtask-vs.-Macrotask-in-JavaScript-What-are-The-Differences-1.png)

* File reading happens in **libuv**
* Completion time varies
* When done:

  * Promise callbacks go to **Microtask Queue**
* Event Loop executes:

  1. Call Stack
  2. **Microtask Queue**
  3. Callback (Macrotask) Queue

---

## 1️⃣3️⃣ Microtask Queue (Why Promises Feel Faster)

### Priority Order

```
1. Call Stack
2. Microtask Queue (Promises)
3. Callback Queue (setTimeout, fs callbacks)
```

---

### Example

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

### Output

```
A
D
C
B
```

📌 Promises **always execute before callbacks**.

---

## 1️⃣4️⃣ libuv + Promises (Behind the Scenes)

### Important Truth

> Promises do NOT replace libuv
> They only improve how we **consume async results**

### Flow with Promises

```
JS Code
  ↓
Promise Created
  ↓
Node APIs
  ↓
libuv (Thread Pool / OS)
  ↓
Promise Settled
  ↓
Microtask Queue
  ↓
Event Loop
  ↓
Call Stack
```

---

## 1️⃣5️⃣ Serial File Reading with Promises (Clean Way)

```js
fs.promises.readFile("f1.txt")
  .then(data => {
    console.log(data);
    return fs.promises.readFile("f2.txt");
  })
  .then(data => {
    console.log(data);
    return fs.promises.readFile("f3.txt");
  })
  .then(data => console.log(data))
  .catch(console.error);
```

✔ Order guaranteed
✔ No nesting
✔ Readable

---

## 1️⃣6️⃣ Why Promises Are Better Than Callbacks

| Callbacks        | Promises       |
| ---------------- | -------------- |
| Nested           | Flat           |
| Error everywhere | Centralized    |
| Hard to read     | Clean          |
| No state         | Explicit state |
| Callback hell    | Chainable      |

---

## 1️⃣7️⃣ Mental Model (Interview Gold)

> **Promises represent future values. They settle asynchronously, place their handlers in the microtask queue, and are executed by the event loop before regular callbacks, making async code predictable, readable, and manageable.**

---

## 1️⃣8️⃣ Visualization Tool (Highly Recommended)

🔗 [https://www.jsv9000.app/](https://www.jsv9000.app/)

Ask learners to:

* Paste promise + timeout code
* Step execution
* Observe microtask queue priority

---

## 🚀 What’s Next?

Next class:

### 👉 **Async / Await**

* Promises without `.then()`
* Try / catch
* Cleaner serial async
* Real production style

---

### 💬 Start Doubt Session

questions to think about:

* Why promises run before setTimeout?
* What happens if resolve is called twice?
* How does async/await relate to promises?

---

