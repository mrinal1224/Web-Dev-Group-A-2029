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
        let success = Math.random() > 1;
        if (success) {
          resolve(["Nice!", "Interesting post", "Subscribed!"]);
        } else {
          reject("Failed to fetch comments ❌");
        }
      }, 800);
    });
  }