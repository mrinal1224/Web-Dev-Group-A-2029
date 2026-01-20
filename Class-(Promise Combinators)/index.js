//  Promise Combinators
// Promise.all
// Promise.allSettled

// Promise.race
// Promise.any

function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId: 1, username: "JohnDoe" }), 1000);
  });
}

function fetchUserPosts(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 1000);
  });
}

function fetchUserComments() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() > 0;
      if (success) {
        resolve(["Nice!", "Interesting post", "Subscribed!"]);
      } else {
        reject("Failed to fetch comments ❌");
      }
    }, 800);
  });
}

// Promise Chaining and Handle all these PROMISES

//   fetchUserData().then(function(userData){
//     console.log(userData)
//     return fetchUserPosts()
//   }).then(function(postData){
//     console.log(postData)
//     return fetchUserComments()
//   }).then(function(commentData){
//     console.log(commentData)
//   })

// Promise.all

Promise.all([fetchUserData(), fetchUserPosts(), fetchUserComments()])
  .then(function (result) {
    console.log(result[0]);
  })
  .catch(function (err) {
    console.log(err);
  });

  // Promises are getting executed - parallely - LibUv
  // if one promise fails the entire operation fails - 
  // Applications - Paymet gateways


  Promise.allSettled([fetchUserData(), fetchUserPosts(), fetchUserComments()])
  .then(function (result) {
    console.log(result[0].value);
  })
  .catch(function (err) {
    console.log(err);
  });

  // Promises are getting executed - parallely - LibUv
//   if one promise fails it does not effects other promises
