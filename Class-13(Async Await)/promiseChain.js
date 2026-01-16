function placeOrder(drink) {
  return new Promise(function (resolve, reject) {
    if (drink === "coffee") {
      resolve("Order taken for coffee");
    } else {
      reject("Cannot take the Order");
    }
  });
}

function processOrder(orderPlaced) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(`${orderPlaced} and Served.`);
    }, 1000);
  });
}

function generateBill() {
  return new Promise(function (resolve) {
    resolve(`Bill Generated`);
  });
}

// Promise Chaining

// placeOrder("coffee")
//   .then(function (orderTaken) {
//     console.log(orderTaken);
//     return orderTaken;
//   })
//   .then(function (orderTakenData) {
//     const finalOrder = processOrder(orderTakenData);
//     return finalOrder;
//   })
//   .then(function (finalOrderData) {
//     console.log(finalOrderData);
//     const bill = generateBill();
//     return bill;
//   })
//   .then(function (billData) {
//     console.log(billData);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// Async Await

async function serveOrder() {
  try {
    const orderPlaced = await placeOrder("coffee"); // error
    const orderServed = await processOrder(orderPlaced);
    const bill = await generateBill();

    console.log(orderPlaced);
    console.log(orderServed);
    console.log(bill);
  } catch (error) {
    console.log(error);
  }
}

serveOrder();
