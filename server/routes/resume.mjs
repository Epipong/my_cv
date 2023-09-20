import express from "express";
import { ObjectId } from "mongodb";
import '../db/conn.mjs';
import Resume from '../models/resume.model.mjs';

const router = express.Router();

// Get a list of 50 resumes
router.get("/", async (_req, res) => {
    let results = await Resume.collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
    let newResume = new Resume(req.body);
    let result = await Resume.collection.insertOne(newResume);
    res.send(result).status(204);
});

// Get resume by id
router.get("/:id", async (req, res) => {
    let query = { _id: ObjectId(req.params.id) };
    let result = await Resume.findOne(query);
    if (!result) {
        res.send("Not found!").status(404);
    } else {
        res.send(result).status(200);
    }
});

// Delete contact
router.delete("/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    let result = await Resume.deleteOne(query);

    res.send(result).status(200);
});

// Update contact from resume
router.put("/:id/contacts", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $set: { contact: req.body }
    };
    let result = await Resume.updateOne({ 'contact._id': ObjectId(resume.contact._id) }, updates);

    res.send(result).status(200);
});

// Read all skills
router.get("/:id/skills", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }

    res.send(resume.skills).status(200);
});

// Add a new skill to the collection
router.post("/:id/skills", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $push: { skills: req.body }
    };
    let result = await Resume.updateOne(query, updates);

    res.send(result).status(200);
});

// Update skill
router.put("/:id/skills/:skill_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $set: { 'skills.$.content': req.body.content }
    };
    let result = await Resume.updateOne({ 'skills._id': ObjectId(req.params.skill_id) }, updates);

    res.send(result).status(200);
});

// Delete a skill
router.delete("/:id/skills/:skill_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    resume.skills.pull({ _id: ObjectId(req.params.skill_id) });
    const updates = {
        $set: { skills: resume.skills }
    }
    let result = await Resume.updateOne(query, updates);

    res.send(result).status(200);
});

// Read all languages
router.get("/:id/languages", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }

    res.send(resume.languages).status(200);
});

// Add a new language to the collection
router.post("/:id/languages", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);

    resume.languages.push(req.body);
    await resume.save()
        .then(resume => {
            res.send(resume.languages).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
});

// Update language
router.put("/:id/languages/:language_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);

    resume.languages.map(lang => {
        if (lang._id == req.params.language_id) {
            lang.name = req.body.name;
            lang.level = req.body.level;
        }
        return lang;
    });
    await resume.save()
        .then(resume => {
            res.send(resume.languages).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
});

// Delete a language
router.delete("/:id/languages/:language_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);

    resume.languages.pull({ _id: ObjectId(req.params.language_id) });
    await resume.save()
        .then(resume => {
            res.send(resume.languages).status(200);
        }).catch(err => {
            res.status(500).send(err);
        });
});

// Read all experiences
router.get("/:id/experiences", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }

    res.send(resume.experiences).status(200);
});

// Add a new experience to the collection
router.post("/:id/experiences", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $push: { experiences: req.body }
    };
    let result = await Resume.updateOne(query, updates);

    res.send(result).status(200);
});

// Update experience
router.put("/:id/experiences/:experience_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
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
    let result = await Resume.updateOne({ 'experiences._id': ObjectId(req.params.experience_id) }, updates);

    res.send(result).status(200);
});

// Delete an experience
router.delete("/:id/experiences/:experience_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    resume.experiences.pull({ _id: ObjectId(req.params.experience_id) });
    const updates = {
        $set: { experiences: resume.experiences }
    }
    let result = await Resume.updateOne(query, updates);

    res.send(result).status(200);
});

// Read all formations
router.get("/:id/formations", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }

    res.send(resume.formations).status(200);
});

// Add a new formation to the collection
router.post("/:id/formations", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $push: { formations: req.body }
    };
    let result = await Resume.updateOne(query, updates);

    res.send(result).status(200);
});

// Update formation
router.put("/:id/formations/:formation_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $set: {
            'formations.$.period': req.body.period,
            'formations.$.title': req.body.title,
            'formations.$.school': req.body.school
        }
    };
    let result = await Resume.updateOne({ 'formations._id': ObjectId(req.params.formation_id) }, updates);

    res.send(result).status(200);
});

// Delete a formation
router.delete("/:id/formations/:formation_id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    resume.formations.pull({ _id: ObjectId(req.params.formation_id) });
    const updates = {
        $set: { formations: resume.formations }
    }
    let result = await Resume.updateOne(query, updates);

    res.send(result).status(200);
});

// Read hobby
router.get("/:id/hobbies", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }

    res.send(resume.hobbies).status(200);
})

// Update hobby
router.put("/:id/hobbies", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    let resume = await Resume.findOne(query);
    if (!resume) {
        return res.send({ errors: "Resume not found" }).status(404);
    }
    const updates = {
        $set: { hobbies: req.body }
    };
    let result = await Resume.updateOne({ 'hobbies._id': ObjectId(resume.hobbies._id) }, updates);

    res.send(result).status(200);
});

export default router;
