import express from "express";
import { ObjectId } from "mongodb";
import '../db/conn.mjs';
import User from '../models/user.model.mjs';

const router = express.Router();

// Get a list of 50 users
router.get("/", async (_req, res) => {
    let results = await User.collection.find({})
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
    let result = await User.findOne(query);
    if (!result) {
        res.send("Not found!").status(404);
    } else {
        res.send(result).status(200);
    }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    let result = await User.deleteOne(query);

    res.send(result).status(200);
});

// Update contact from user
router.put("/:id/contact", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $set: { contact: req.body }
    };
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Read all experiences
router.get("/:id/experience", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }

    res.send(user.experiences).status(200);
});

// Add a new experience to the collection
router.post("/:id/experience", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $push: { experiences: req.body }
    };
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Update experience
router.put("/:id/experience/:experience_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $set: {
            'experiences.$.period': req.body.period,
            'experiences.$.company': req.body.company,
            'experiences.$.mission': req.body.mission,
            'experiences.$.role': req.body.role,
            'experiences.$.content': req.body.content,
            'experiences.$.stack': req.body.stack
        }
    };
    let result = await User.updateOne({ 'experiences._id': ObjectId(req.params.experience_id) }, updates);

    res.send(result).status(200);
});

// Delete an entry
router.delete("/:id/experience/:experience_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    user.experiences.pull({ _id: ObjectId(req.params.experience_id) });
    const updates = {
        $set: { experiences: user.experiences }
    }
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

export default router;
