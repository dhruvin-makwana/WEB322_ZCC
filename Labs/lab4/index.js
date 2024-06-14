function connectToDatabase(handler=()=>{}) {
  let randomTime = Math.floor(Math.random() * 2000) + 1;
  setTimeout(() => {
    console.log("Connected to DB");
    handler()
  }, randomTime);

}

function queryDatabase() {
  let randomTime = Math.floor(Math.random() * 1000) + 1;

  setTimeout(() => {
    console.log("Executing query from the DB");
  }, randomTime);
}
function post(handler,secondHandler){
    console.log("Got a POST request")
    handler(secondHandler)
}

post(connectToDatabase,queryDatabase)



