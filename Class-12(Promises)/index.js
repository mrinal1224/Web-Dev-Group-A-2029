// construct a promise

// Coin Toss
// Heads - Success
// Tails - failure
// 50%- heads , 50%-tails

// 0-0.5 // failure
// 0.51-0.99 // success

const p1 = new Promise(function (resolve, reject) {
   const isHeads = Math.random() > 0.5

   if(isHeads){
      resolve('We got heads we Won!')
   }
   else{
      reject("We got Tails , we Lost!")
   }
});


// promise handlers

p1.then(function(data){
    console.log(data)
})

p1.catch(function(err){
    console.log(err)
})

p1.finally(function(){
    console.log("Coin toss done!")
})


