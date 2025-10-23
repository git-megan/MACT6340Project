import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";

// data from db for projects
let projects = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

// get the different pages of the app
app.get("/", async (req, res, next) => {
  // connect to database on getting the index page
  try {
    await db.connect();
    // query database for project records
    projects = await db.getAllProjects();
    console.log(projects);

    if (!projects || projects.length === 0) {
      return res.status(404).send("No projects found in database");
    }

    // get a random project id between 1 and the length of the projects array
    const randomIndex = Math.floor(Math.random() * projects.length);
    const project = projects[randomIndex];

    res.render("index.ejs", { project: project });
  } catch (err) {
    next(err); // send error to Express error handler
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// pass project data as an object to the projects page
app.get("/projects", (req, res) => {
  res.render("projects.ejs", { projectArray: projects });
});

// individual project page
app.get("/project/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const project = await db.getProjectById(id);

    if (!project) {
      return res.status(404).send("Project with that id was not found");
    }

    res.render("project.ejs", { project: project });
  } catch (err) {
    next(err);
  }
});

app.post("/mail", async (req, res) => {
  await utils
    .sendMessage(req.body.sub, req.body.txt)
    .then(() => {
      res.send({ result: "success" });
    })
    .catch(() => {
      res.send({ result: "failure" });
    });
});

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.render("error.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
