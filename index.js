const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

const PORT = 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("viewengine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/text");
}
// Index route

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});

// New route

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create route

app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => console.log("success"))
    .catch((err) => console.log(err));

  res.redirect("/chats");
});

// Edit route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update route

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { message: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMsg, updated_at: new Date() },
    { runValidators: true },
    { new: true }
  );

  await Chat.findByIdAndUpdate();

  res.redirect("/chats");
});

// Destroy route

app.delete("/chats/:id", async (req, res) => {
  console.log("at delete");
  let { id } = req.params;
  const deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
