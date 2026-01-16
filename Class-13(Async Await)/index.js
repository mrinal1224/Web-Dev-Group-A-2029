function placeOrder(drink, successCallback, errorCallback) {
  setTimeout(() => {
    if (drink === "coffee") {
      successCallback("Order taken");
    } else {
      errorCallback("Cannot take the Order");
    }
  }, 1000);
} // 1

function processOrder(orderPlaced, callback) {
  setTimeout(() => {
    callback(`${orderPlaced} and Served.`);
  }, 1000);
} // 2

function generateBill(callback) {
  setTimeout(() => {
    callback("Bill Generated");
  }, 1000);
} // 3

// Execute these functions one by one in order

function serveOrder() {
  placeOrder("coffee", function (orderPlaced) {
    processOrder(orderPlaced, function (finalOrder) {
      generateBill(function (billData) {
        // Now you wil get stuck in callback Hell
      });
    });
  });
}

serveOrder();
