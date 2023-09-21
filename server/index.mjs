import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import resumes from "./routes/resume.mjs";
import users from "./routes/user.mjs";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/resumes", resumes);
app.use("/users", users);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).send(err)
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
