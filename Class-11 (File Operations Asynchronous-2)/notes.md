
---

# 🚀 Full Stack LLD & Projects

## JavaScript-14: Asynchronous Programming-1 (Beginner → Internals)

---

## 🧭 Agenda

* Synchronous vs Asynchronous programming
* Callbacks & `setTimeout`
* Event Loop mechanism (step-by-step)
* Async functions using inbuilt modules (`fs`)
* Concurrent vs Serial operations
* Visualizing async execution

---

## 1️⃣ Synchronous vs Asynchronous Programming (Foundations)

Before we touch **code**, let’s understand **how humans work** — because programming models come from real life.

---

## ☕ Synchronous Way of Doing a Task

Imagine you’re at a **coffee shop** with your friends.

You go to the counter, place your order, and then…

👉 **You must stand there**
👉 **You cannot move**
👉 **You cannot talk, sit, scroll, or relax**

You wait until:

* Coffee is prepared
* Coffee is handed to you

Only **after that**, the **next person** can place their order.

### Problems with this approach

* Everyone waits
* Time is wasted
* If one coffee takes long → everyone suffers

---

### 🧠 How this maps to JavaScript

In **synchronous JavaScript**:

* Each task **blocks** the next task
* If a task takes time (file read, DB query):

  * JavaScript **waits**
  * Program feels **frozen**

This is exactly like **standing at the counter doing nothing**.

---

### Ask learners:

> Would you like to stand like this in a real coffee shop?
> Would this scale if 100 people arrive?

(Expect “No” 😄)

---

## ☕ Asynchronous Way of Doing a Task (Smart Way)

Now imagine this instead:

* You place your coffee order
* You **move away**
* You sit with friends
* You scroll Instagram
* You chat
* You relax ☺️

When coffee is ready:

* Barista **calls your name**
* You go and pick it up

---

### 🧠 JavaScript Mapping

* You start a task
* You **don’t wait**
* You provide a **callback**
* When task finishes → callback runs

📌 **This is asynchronous programming**

---

### 📘 Definition (Beginner Friendly)

> **Asynchronous programming allows tasks to start, continue in the background, and notify JavaScript when they are done — without blocking the main program.**

That’s it.
That’s the core principle.

---

## 2️⃣ First Code Example: Synchronous Execution

```js
console.log("Start");

function syncFunction() {
  console.log("Hello");
}

syncFunction();

console.log("End");
```

### Output

```
Start
Hello
End
```

### Why?

* JavaScript runs **line by line**
* One task finishes → next task starts
* No waiting, no delegation

---

## 3️⃣ Introducing `setTimeout` (First Async Tool)

### Instructor Note

Many beginners think `setTimeout` is “just a delay”.
It’s **not** — it’s your first exposure to **async execution**.

---

### What is `setTimeout`?

`setTimeout` schedules a function to run **later**, after a given time (milliseconds).

```js
function sayHello() {
  console.log("Hello!");
}

setTimeout(sayHello, 2000);
```

🕒 After 2 seconds:

```
Hello!
```

---

## 4️⃣ Asynchronous Code Example

```js
console.log("Start");

setTimeout(function () {
  console.log("Hello");
}, 2000);

console.log("End");
```

### Ask learners to predict output

Most beginners say:

```
Start
Hello
End
```

### Actual Output

```
Start
End
Hello (after 2 seconds)
```

---

### What just happened?

* `setTimeout` did **not block**
* JavaScript **moved ahead**
* Callback executed **later**

👉 This means **JavaScript did NOT wait**

---

## 5️⃣ The Big Question ❓

> How does JavaScript manage this?
> How does it remember to run `Hello` later?

### Answer:

## 🔁 **Event Loop Mechanism**

---

## 6️⃣ The Event Loop – Core Components

To understand async execution, you must know **four things**:

1. Call Stack
2. Web / Node APIs
3. Callback Queue
4. Event Loop

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20250208123836185275/Event-Loop-in-JavaScript.jpg)

![Image](https://felixgerschau.com/static/79486d91b22a7c1b4044fce88a4cae20/5a190/js-event-loop-explained.png)

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20200224050909/nodejs2.png)

---

## 7️⃣ The Call Stack (Execution Engine)

* A **stack** (LIFO)
* Tracks **what is currently running**
* JavaScript can run **only one thing at a time**

```js
console.log("Start");
```

➡ goes to stack → executes → removed

---

## 8️⃣ Dry Run: `setTimeout` Step by Step

```js
console.log("Start");

setTimeout(() => {
  console.log("Hello");
}, 2000);

console.log("End");
```

---

### Step 1: `console.log("Start")`

* Goes to call stack
* Executes immediately

📤 Output:

```
Start
```

---

### Step 2: `setTimeout(...)`

* Goes to call stack
* JavaScript **recognizes it as async**
* Sends it to **Web / Node APIs**
* Timer starts

📌 **Callback does NOT stay in stack**

---

### Step 3: `console.log("End")`

* Stack is free
* Executes immediately

📤 Output:

```
End
```

---

### Step 4: Timer completes

* Callback moves to **Callback Queue**

---

### Step 5: Event Loop activates

* Checks: Is call stack empty? ✅
* Moves callback to stack
* Executes `console.log("Hello")`

📤 Output:

```
Hello
```

---

## 9️⃣ One-Look Mental Diagram

```
Call Stack        Web APIs         Callback Queue
---------        --------         --------------
console.log      setTimeout       (waiting)
                 (2 seconds)
```

Event Loop keeps checking:

> “Stack empty? Can I push next callback?”

---

## 🔟 Async with Inbuilt Modules (`fs`)

### Synchronous File Read (Blocking)

```js
const fs = require("fs");

console.log("Before");

let data = fs.readFileSync("f1.txt");

console.log("File data:", data);
```

⛔ JavaScript waits
⛔ Everything stops

---

### Asynchronous File Read (Non-Blocking)

```js
const fs = require("fs");

console.log("Before");

fs.readFile("f1.txt", (err, data) => {
  console.log("File data:", data);
});

console.log("After");
```

### Output

```
Before
After
File data
```

✔ JS continues
✔ File read happens in background

---

## 1️⃣1️⃣ Concurrent Asynchronous Operations

```js
fs.readFile("f1.txt", cb1);
fs.readFile("f2.txt", cb2);
fs.readFile("f3.txt", cb3);
```

### Output Order ❓

* f1 f2 f3 ❌ not guaranteed
* f3 f1 f2 ❌ possible
* Any order ✅

---

### Why?

* All tasks start together
* Completion time differs
* Callbacks enter queue **when ready**

---

## 1️⃣2️⃣ Concurrency vs Parallelism

### 🟡 Concurrent Execution (Node.js style)

* Single JS thread
* Multiple tasks in progress
* Context switching

👨‍🍳 **One chef, many dishes**

---

### 🔵 Parallel Execution

* Multiple CPU cores
* Tasks truly run at same time

👨‍🍳👨‍🍳👨‍🍳 **Multiple chefs**

---

📌 Node.js JavaScript is:

> **Concurrent, not parallel**

(But internally uses threads via libuv)

---

## 1️⃣3️⃣ Serial Operations (Order Matters)

Sometimes order is critical.

### ❌ Concurrent (unordered)

```js
fs.readFile("a");
fs.readFile("b");
```

### ✅ Serial (ordered)

```js
fs.readFile("f1.txt", cb1);

function cb1() {
  fs.readFile("f2.txt", cb2);
}

function cb2() {
  fs.readFile("f3.txt", cb3);
}
```

✔ Order guaranteed
❌ Callback nesting (Callback Hell)

---

## 1️⃣4️⃣ Visualizing Async Code (Highly Recommended)

Use this tool in class 👇
🔗 [https://www.jsv9000.app/](https://www.jsv9000.app/)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fek7ji4zrimozpp2yzk0a.png)

![Image](https://media.licdn.com/dms/image/v2/D4D05AQHhvKhXAQ_qTA/videocover-high/B4DZgEEnNTGgCI-/0/1752415021036?e=2147483647\&t=iL7bICfdmiiexX-BpCdJur61Z26tGvGbkXDNhx0vU0c\&v=beta)

Ask learners to:

* Paste async code
* Step through execution
* Observe stack, queue, event loop

---

## 🎯 Final Takeaways (Beginner Summary)

* JavaScript runs on **one main thread**
* Async tasks are **delegated**
* Event loop coordinates execution
* Concurrency ≠ parallelism
* Order requires explicit control

---

## 🚀 What’s Next?

In the next class:

### 👉 **Promises (That’s a Promise 😄)**

* Why callbacks fail
* Promise states
* Promise chaining
* Cleaner async code

---



