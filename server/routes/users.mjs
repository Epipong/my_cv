import express from "express";
import db from '../db/conn.mjs';
import { ObjectId } from "mongodb";
import User from '../models/user.model.mjs';

const router = express.Router();

// Get a list of 50 users
router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
    let newUser = new User(req.body);
    let result = await User.collection.insertOne(newUser);
    res.send(result).status(204);
});

// Get user by id
router.get("/:id", async (req, res) => {
    let query = { _id: ObjectId(req.params.id) };
    let result = await User.collection.findOne(query);
    if (!result) {
        res.send("Not found!").status(404);
    } else {
        res.send(result).status(200);
    }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    let result = await User.collection.deleteOne(query);

    res.send(result).status(200);
});

// Update contact from user
router.put("/:id/contact", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.collection.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    req.body._id = ObjectId(user.contact._id)
    const updates = {
        $set: { contact: req.body }
    };
    console.log(updates);
    let result = await User.collection.updateOne(query, updates);

    res.send(result).status(200);
});

// Update experience
router.put("/:id/experience/:experience_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.collection.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $set: { contact: req.body }
    };
    console.log(updates);
    let result = await User.collection.updateOne(query, updates);

    res.send(result).status(200);
});

export default router;
