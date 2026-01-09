//read opertaions

const fileSystem = require("fs");

console.log('start')

// synchronously reading files

// const data1 = fileSystem.readFileSync("f1.txt");

// const data2 = fileSystem.readFileSync("f2.txt");

// const data3 = fileSystem.readFileSync("f3.txt");

// console.log("This is a file 1 Data -> " + data1);

// console.log("This is a file 2 Data -> " + data2);

// console.log("This is a file 3 Data -> " + data3);



// Read Files Asynchronously


fileSystem.readFile('f1.txt' , function(err , data){
   if(err){
    console.log('Cannot Read the File-> ' +  err)
   }

   console.log("This is file 1 data-> " +  data)
})

fileSystem.readFile('f2.txt' , function(err , data){
    if(err){
     console.log('Cannot Read the File-> ' +  err)
    }
 
    console.log("This is file 2 data-> " +  data)
 })

 fileSystem.readFile('f3.txt' , function(err , data){
    if(err){
     console.log('Cannot Read the File-> ' +  err)
    }
 
    console.log("This is file 3 data-> " +  data)
 })




console.log("End") // main feature
