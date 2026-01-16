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
      }, 10000);
    });
  }
  
  function generateBill() {
    return new Promise(function (resolve) {
      resolve(`Bill Generated`);
    });
  }