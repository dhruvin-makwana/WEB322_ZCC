const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dhruvinmakwana:M4gq8oPPBtowUFDC@chirper.mkm1tpd.mongodb.net/chirper?retryWrites=true&w=majority&appName=Chirper"
);

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

let usersObj=new usersModel({
    firstname:"Test1",
    lastname:"User",
    email:"test1@tst.com",
    password:"1234",
    lastname:"User",
})
usersModel.insertMany([{
    firstname:"Test1",
    lastname:"User",
    email:"test1@tst.com",
    password:"1234",
    lastname:"User",
},
{
    firstname:"Test2",
    lastname:"User",
    email:"test2@tst.com",
    password:"1234",
    lastname:"User",
},
{
    firstname:"Test3",
    lastname:"User",
    email:"test3@tst.com",
    password:"1234",
    lastname:"User",
}])

testUser.save().then(()=>{
    console.log("data saved")
})

async function getData() {
  let UserObj = await usersModel
    .findOne({
      firstname: "Dummy",
    })
    .exec();
  console.log(UserObj.firstname, UserObj.email);
}

getData();

let arrayObj = [
    { test: 1 },
    { test: 5 },
    { test: 4 },
    { test: 3 },
    { test: 2 },
];

arrayObj.find((elm)=>{
    return elm.test===3
})