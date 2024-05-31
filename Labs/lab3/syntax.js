// function displayProductDetails(product){
//     console.log(`Name: ${product.name} Price: ${product.price}`)
// }

// function displayProductDetails({name,price,notes}){
//     console.log(`Name: ${name} Price: ${price} Notes:${notes}`)
// }
// let product={
//     name:"Dummy Product",
//     price:123,
//     notes:"Test note"
// }
// displayProductDetails(product)

// let arr=[1,2,3,4,5]
// let [first,second,third]=arr
// // let first = arr[0]
// // let second = arr[1]
// // let third = arr[2]
// // console.log(first)
// // console.log(second)
// // console.log(third)
// for (const elm of arr){
//     console.log(elm)
// }
// for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     console.log(element)
// }

// arr.forEach(function(elm){
//     console.log(elm)
// })

// function adder(...values){
//     let result=0
//     for(const val of values){
//         result+=val
//     }
//     return result
// }

// function adderV2(arrValues){
//     let result=0
//     for(const val of arrValues){
//         result+=val
//     }
//     return result
// }
// let result=adder(1,2,3,5,12,21,21,21,21,43,324,32,5,32) // 1+2+undefined
// console.log(result)

// let ar=[1,1,23,1,23,123,12,3,213,]
// let ar2=[...ar]

// arr=[1,2,3]

// let product={
//     name:"Dummy Product",
//     price:123,
//     notes:"Test note"
// }

// let productV2={...product}
// productV2.price=345

// let productV2={...product,notes:"Second Note"}
// console.log(productV2)

// console.log(product)

function sendEmail() {
  console.log("Email sent to devs");
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Invalid operation: Division by zero")
  }
  let c = a / b;
  return c;
}

try {
  console.log(divide(4, 0));
} catch (sample) {
  sendEmail();
  console.log(`Something went wrong: ${sample.message}`);
} finally {
  console.log("Unsafe code was executed");
}