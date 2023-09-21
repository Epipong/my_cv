import express from "express";
import { ObjectId } from "mongodb";
import '../db/conn.mjs';
import User from '../models/user.model.mjs';

const router = express.Router();

// Get a list of users
router.get("/", async (req, res) => {
    console.info(`${req.method} ${req.url}`);
    let results = await User.collection.find({})
        .toArray();
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.set('X-Total-Count', results.length);
    res.send(results).status(200);
});

// Add a new user to the collection
router.post("/", async (req, res) => {
    console.info(`${req.method} ${req.url}`);
    let newUser = new User(req.body);
    await newUser.save()
        .then(user => {
            res.send(user).status(204);
        }).catch(err => {
            res.status(500).send(err);
        });
});

// Update a specific user
router.put("/:id", async (req, res) => {
    console.info(`${req.method} ${req.url}`);
    const query = { _id: ObjectId(req.params.id) };
    let user = await User.findOne(query);

    if (!user) {
        return res.send({ errors: "User not found" }).status(404);
    }
    const updates = {
        $set: { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        }
    };
    let result = await User.updateOne(query, updates);
    res.send(result).status(200);
});

// Delete user
router.delete("/:id", async (req, res) => {
    console.info(`${req.method} ${req.url}`);
    const query = { _id: ObjectId(req.params.id) };

    let result = await User.deleteOne(query);
    res.send(result).status(200);
});

export default router;