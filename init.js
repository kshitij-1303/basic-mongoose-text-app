const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/text");
}

let allChats = [
  {
    from: "Peter Parker",
    to: "Tony Stark",
    message: "What is EDITH?",
    created_at: new Date(),
  },
  {
    from: "Akash",
    to: "Yash",
    message: "I live in Delhi",
    created_at: new Date(),
  },
  {
    from: "Suyash",
    to: "Aditya",
    message: "I had a road accident, check out my essay",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats).then((res) => {
  console.log(res);
});
