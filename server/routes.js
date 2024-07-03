




// const express = require("express");
// const router = express.Router();
// const { getConnectedClient } = require("./database");
// const { ObjectId } = require("mongodb");

// const getCollection = () => {
//   const client = getConnectedClient();
//   const collection = client.db("skillfinder").collection("users");
//   return collection;
// };

// // GET /users
// router.get("/users", async (req, res) => {
//   const collection = getCollection();
//   const users = await collection.find({}).toArray();
//   res.status(200).json(users);
// });

// // POST /users
// router.post("/users", async (req, res) => {
//   const collection = getCollection();
//   const { name, skills, contact } = req.body;

//   if (!name || !skills || !contact) {
//     return res.status(400).json({ msg: "All fields are required" });
//   }

//   const newUser = await collection.insertOne({ name, skills, contact });
//   res.status(201).json({ name, skills, contact, _id: newUser.insertedId });
// });

// // DELETE /users/:id
// router.delete("/users/:id", async (req, res) => {
//   const collection = getCollection();
//   const _id = new ObjectId(req.params.id);
//   const deletedUser = await collection.deleteOne({ _id });
//   res.status(200).json(deletedUser);
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("skillfinder").collection("users");
  return collection;
};

// GET /users
router.get("/users", async (req, res) => {
  const collection = getCollection();
  const users = await collection.find({}).toArray();
  res.status(200).json(users);
});

// POST /users
router.post("/users", async (req, res) => {
  const collection = getCollection();
  const { name, skills, contact, pin } = req.body;

  if (!name || !skills || !contact || !pin) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const hashedPin = await bcrypt.hash(pin, 10);
  const newUser = await collection.insertOne({ name, skills, contact, pin: hashedPin });
  res.status(201).json({ name, skills, contact, _id: newUser.insertedId });
});

// DELETE /users/:id
router.delete("/users/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ msg: "Pin is required" });
  }

  const user = await collection.findOne({ _id });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isPinValid = await bcrypt.compare(pin, user.pin);

  if (!isPinValid) {
    return res.status(403).json({ msg: "Invalid pin" });
  }

  const deletedUser = await collection.deleteOne({ _id });
  res.status(200).json(deletedUser);
});

module.exports = router;
