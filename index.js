const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const PORT = 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("viewengine", "ejs");

main()
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/text");
}

let chat1 = new Chat({
  from: "Peter Parker",
  to: "Tony Stark",
  message: "Naya suit dede bhai",
  created_at: new Date(),
});

chat1.save().then((res) => {
  console.log(res);
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
