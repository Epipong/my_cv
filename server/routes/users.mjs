import express from "express";
import db from '../db/conn.mjs';
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

export default router;
