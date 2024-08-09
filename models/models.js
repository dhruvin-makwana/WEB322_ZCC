const Sequelize = require("sequelize");
const sequelize = new Sequelize("chirper", "chirper_owner", "5auMevRwK6EL", {
  host: "ep-super-lab-a5n4nfl3.us-east-2.aws.neon.tech",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

const Users = sequelize.define("Users", {
  username: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
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

async function initDB() {
  await sequelize.authenticate();
  await sequelize.sync();
  await Users.create({
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "test@test.com",
    password: "123456",
    profileImage: "https://placehold.co/300?text=T",
    isLoggedin: false,
    isVerified: true,
  });
  await Users.create({
    firstName: "Dummy",
    lastName: "User",
    email: "dummy@dummy.com",
    password: "123456",
    profileImage: "https://placehold.co/300?text=D",
    isLoggedin: false,
    isVerified: true,
  });

  await Tweets.create({
    tweetContent: "Test Tweet1",
    UserId: 1,
  });
  await Tweets.create({
    tweetContent: "Test Tweet2",
    UserId: 1,
  });
  await Tweets.create({
    tweetContent: "Test Tweet3",
    UserId: 1,
  });
  await Tweets.create({
    tweetContent: "Dummy Tweet1",
    UserId: 2,
  });
  await Tweets.create({
    tweetContent: "Dummy Tweet2",
    UserId: 2,
  });
}

module.exports = { initDB, Users, Tweets };
