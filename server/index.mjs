import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import users from "./routes/users.mjs";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/users", users);

app.use((err, _req, res, next) => {
    console.log(err);
    res.status(500).send(err)
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
