const Sequelize = require("sequelize");
const sequelize = new Sequelize("chirper", "chirper_owner", "fjBzWq9DegP3", {
  host: "ep-billowing-salad-a584mg9d.us-east-2.aws.neon.tech",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

const Users = sequelize.define("Users", {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  profileImage: Sequelize.STRING,
  isLoggedin: Sequelize.BOOLEAN,
  isVerified: Sequelize.BOOLEAN,
});
const Tweets = sequelize.define("Tweets", {
  tweetContent: Sequelize.STRING,
});

Users.hasMany(Tweets);
Tweets.belongsTo(Users);

// tweet_id tweet_content timestamp  userPointer
// 1        test Tweet    xxxx-xx-xx 1
// 2        test Tweet    xxxx-xx-xx 1
// 3        test Tweet    xxxx-xx-xx 1
// 4        test Tweet    xxxx-xx-xx 2
// 5        test Tweet    xxxx-xx-xx 2
// 6        test Tweet    xxxx-xx-xx 2
// 7        test Tweet    xxxx-xx-xx 2
async function initDB() {
  await sequelize.authenticate();
  await sequelize.sync();
}

async function createuser() {
  await Users.create({
    firstname: "Test",
    lastname: "User",
    email: "test@test.com",
    password: "123456",
    profileImage: "https://placehold.co/300?text=T",
    isLoggedin: false,
    isVerified: true,
  });
}

async function updateUser() {
  await Users.update(
    {
      firstname: "Test",
      lastname: "User",
    },
    {
      where: {
        email: "test@test.com",
      },
    }
  );
}

async function getUser(email) {
  const results = await Users.findAll(
    {
      attributes: ["firstname", "lastname", "profileImage"],
    },
    {
      where: {
        email: email,
      },
    }
  );
  for (let index = 0; index < results.length; index++) {
    const element = results[index];
    console.log(`Firstname: ${element.firstname}`);
    console.log(`Lastname: ${element.lastname}`);
    console.log(`ProfileImage: ${element.profileImage}`);
    console.log(`email: ${element.email}`);
  }
}

async function deleteUser(email) {
  await Users.destroy({
    where: {
      email: email,
    },
  });
}
// initDB();
// updateUser()
// getUser("test@test.com")
// deleteUser("test@test.com");

initDB().then(async () => {
  console.log("query executed!!");
  const user = await Users.findOne({
    where: { firstname: "Dummy2" },
    include: Tweets,
  });
  console.log(user);
});
