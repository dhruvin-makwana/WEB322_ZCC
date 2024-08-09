const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profileImage: String,
  age: Number,
  isLoggedin: Boolean,
  isVerified: Boolean,
});

let usersModel = mongoose.model("User", Users);

// let usersObj=new usersModel({
//     firstname:"Test1",
//     lastname:"User",
//     email:"test1@tst.com",
//     password:"1234",
//     lastname:"User",
// })
// usersModel.insertMany([{
//     firstname:"Test1",
//     lastname:"User",
//     email:"test1@tst.com",
//     password:"1234",
//     lastname:"User",
// },
// {
//     firstname:"Test2",
//     lastname:"User",
//     email:"test2@tst.com",
//     password:"1234",
//     lastname:"User",
// },
// {
//     firstname:"Test3",
//     lastname:"User",
//     email:"test3@tst.com",
//     password:"1234",
//     lastname:"User",
// }])

// testUser.save().then(()=>{
//     console.log("data saved")
// })

async function getData(firstname) {
  let UserObj = await usersModel
    .findOne({
      firstname: firstname,
    })
    .exec();
  if (!UserObj) {
    console.log("User not found");
    return;
  }
  console.log(UserObj.firstname, UserObj.email);
}

async function updateuser(currentFirstName, newFirstname) {
  await usersModel.updateOne(
    {
      firstname: currentFirstName,
    },
    {
      $set: {
        firstname: newFirstname,
      },
    }
  );
}

async function deleteUser(currentFirstName) {
  await usersModel.deleteMany({
    firstname: currentFirstName,
  });
}

async function performOperations() {
  await mongoose.connect(
    "mongodb+srv://dhruvinmakwana:M4gq8oPPBtowUFDC@chirper.mkm1tpd.mongodb.net/chirper?retryWrites=true&w=majority&appName=Chirper"
  );

  console.log("Getting user Test");
  await getData("Dummy");
  console.log("--------------------------");

  console.log("Updating user Dummy");
  await updateuser("Dummy", "Test");
  console.log("--------------------------");

  console.log("Getting user Test");
  await getData("Test");
  console.log("--------------------------");

  console.log("Delete user");
  await deleteUser("Test");
  console.log("--------------------------");

  console.log("Getting user Test");
  await getData("Test");
  console.log("--------------------------");
}

performOperations();
