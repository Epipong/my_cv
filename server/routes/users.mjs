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

// Delete contact
router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    let result = await User.deleteOne(query);

    res.send(result).status(200);
});

// Update contact from user
router.put("/:id/contacts", async (req, res) => {
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

// Read all skills
router.get("/:id/skills", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }

    res.send(user.skills).status(200);
});

// Add a new skill to the collection
router.post("/:id/skills", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $push: { skills: req.body }
    };
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Update skill
router.put("/:id/skills/:skill_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $set: { 'skills.$.content': req.body.content }
    };
    let result = await User.updateOne({ 'skills._id': ObjectId(req.params.skill_id) }, updates);

    res.send(result).status(200);
});

// Delete a skill
router.delete("/:id/skills/:skill_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    user.skills.pull({ _id: ObjectId(req.params.skill_id) });
    const updates = {
        $set: { skills: user.skills }
    }
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Read all languages
router.get("/:id/languages", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }

    res.send(user.languages).status(200);
});

// Add a new language to the collection
router.post("/:id/languages", async (req, res) => {
    let query = { _id: ObjectId(req.params.id), 'languages.name': { $ne: req.body.name } };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $push: { languages: req.body }
    };
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Update language
router.put("/:id/languages/:language_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    } else if (req.body.name != new User(user).languages.id(req.params.language_id).name) {
        if (user.languages.filter((l) => l.name === req.body.name).length) {
            return res.send("Language already exists!").status(400);
        }
    }
    const updates = {
        $set: {
            'languages.$.name': req.body.name,
            'languages.$.level': req.body.level
        }
    };
    let result = await User.updateOne({ 'languages._id': ObjectId(req.params.language_id) }, updates);

    res.send(result).status(200);
});

// Delete a language
router.delete("/:id/languages/:language_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    user.languages.pull({ _id: ObjectId(req.params.language_id) });
    const updates = {
        $set: { languages: user.languages }
    }
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Read all experiences
router.get("/:id/experiences", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }

    res.send(user.experiences).status(200);
});

// Add a new experience to the collection
router.post("/:id/experiences", async (req, res) => {
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
router.put("/:id/experiences/:experience_id", async (req, res) => {
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

// Delete an experience
router.delete("/:id/experiences/:experience_id", async (req, res) => {
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

// Read all formations
router.get("/:id/formations", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }

    res.send(user.formations).status(200);
});

// Add a new formation to the collection
router.post("/:id/formations", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $push: { formations: req.body }
    };
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

// Update formation
router.put("/:id/formations/:formation_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    const updates = {
        $set: {
            'formations.$.period': req.body.period,
            'formations.$.title': req.body.title,
            'formations.$.school': req.body.school
        }
    };
    let result = await User.updateOne({ 'formations._id': ObjectId(req.params.formation_id) }, updates);

    res.send(result).status(200);
});

// Delete a formation
router.delete("/:id/formations/:formation_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);
    if (!user) {
        return res.send("User Not found!").status(404);
    }
    user.formations.pull({ _id: ObjectId(req.params.formation_id) });
    const updates = {
        $set: { formations: user.formations }
    }
    let result = await User.updateOne(query, updates);

    res.send(result).status(200);
});

export default router;
