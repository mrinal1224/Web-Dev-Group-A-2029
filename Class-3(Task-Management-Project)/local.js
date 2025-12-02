
const obj = {
   name : "Surya" ,
   phone : 8173873,
   hasAcar : true,
   hobbies : ['Reading' , 'Eat Food']
}


// setItem
// getItem
// removeItem

const data = localStorage.setItem('Person' , JSON.stringify(obj))


const datafromLS = JSON.parse(localStorage.getItem('Person'))

console.log(datafromLS)







