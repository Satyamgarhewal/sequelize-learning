const express = require("express");

const { sequelize, User, Post } = require("./models");
const user = require("./models/user");
const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/users/:id", async (req, res) => {
  console.log("inside users call----->");
  const id = req.params.id;
  try {
    const users = await User.findOne({
      where: { id },
      include: "posts",
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/posts", async (req, res) => {
  const { userId, body } = req.body;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const post = await Post.create({ body, userId: user.id });
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    // include will attach the users with the posts they belong to, it can be used in both ways,
    // but first inside the model in association we need to define the alias for this model.
    // include: [{ model: User, as: "user" }],
    const posts = await Post.findAll({
      include: "user",
    });
    return res.json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });

    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({
      where: { id },
    });

    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.findOne({
      where: { id },
    });
    await posts.destroy();
    return res.json({ message: "Posts deleted successfully!!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen({ port: 9000 }, async () => {
  console.log("Server up on 9000");
  await sequelize.authenticate();
  console.log("Database Connected");
});
