// // output "A" after a random time between 0 & 3 seconds
// function outputA(fcb,scb) {
//   let randomTime = Math.floor(Math.random() * 3000) + 1;

//   setTimeout(() => {
//     console.log("A");
//     fcb(scb);
//   }, randomTime);
// }

// // output "B" after a random time between 0 & 3 seconds
// function outputB() {
//   let randomTime = Math.floor(Math.random() * 3000) + 1;

//   setTimeout(() => {
//     console.log("B");
//   }, randomTime);
// }

// // output "C" after a random time between 0 & 3 seconds
// function outputC(fcb) {
//   let randomTime = Math.floor(Math.random() * 3000) + 1;

//   setTimeout(() => {
//     console.log("C");
//     fcb()
//   }, randomTime);
// }

// // outputA();
// // outputB();
// // outputC();

// outputA(outputC,outputB,outputB,outputB,outputB,outputB)

// function connectDB() {
//   let randomTime = Math.floor(Math.random() * 3000) + 1;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         try{
//             let connection=false
//             let wrongCred=false
//             let noConnection=true
//             if(connection){
//                 console.log("Connected to DB");
//                 resolve(connection);
//                 console.log("Connected to DB");
//             }else if(wrongCred){
//                 throw new Error("Invalid Creds")
//             }else if(noConnection){
//                 throw new Error("No internet")
//             }
//         }catch(e){
//             reject(e)
//         }

//     }, randomTime);
//   });
// }

// function queryData(connection){
//     if(connection){
//         console.log("Running SELECT * FROM USERS")
//     }else{
//         console.log("Error No connection Present")
//     }
// }
// connectDB().then((connectionObj)=>{
//     console.log(`Got connection ${connectionObj}`)
//     queryData(connectionObj)
//     console.log("Ran query")
// }).catch((e)=>{
//     console.log(`Error in getting connection:${e}`)
// })

// output "A" after a random time between 0 & 3 seconds
function outputA() {
  let randomTime = Math.floor(Math.random() * 3000) + 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error in A");
    }, randomTime);
  });
}

// output "B" after a random time between 0 & 3 seconds
function outputB() {
  let randomTime = Math.floor(Math.random() * 3000) + 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("B");
    }, randomTime);
  });
}

// output "C" after a random time between 0 & 3 seconds
function outputC() {
  let randomTime = Math.floor(Math.random() * 3000) + 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("C");
    }, randomTime);
  });
}

// outputA()
//   .then((data) => {
//     console.log(data); // output the result of "outputA()" to the console
//     return outputB();
//   })
//   .then((data) => {
//     console.log(data); // output the result of "outputB()" to the console
//     return outputC();
//   })
//   .then((data) => {
//     console.log(data); // output the result of "outputC()" to the console
//   })
//   .catch((err) => {
//     console.log(err); // output the error to the console
//   });

async function output() {
  try {
    let data = await outputA();
    console.log(data);
    data = await outputB();
    console.log(data);
    data = await outputC();
    console.log(data);
    data = await outputD();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

output();

function handlePostReq(req) {
  connectToDatabase().then(() => {
    generateData().then(() => {
      createObjects().then(() => {
        render(Objects);
      });
    });
  });
}

async function handlePostReq(req) {
  await connectToDatabase();
  await generateData();
  await createObjects();
  await render();
  await render();
  await render();
  await render();
  await render();
  await render();
  await render();
  await render();
  await render();
  await render();
}
