import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
import * as db from "./utils/database.js";
dotenv.config();
import cors from "cors";
import axios from "axios";

// data from db for projects
let projects = [];

const app = express();
app.use(cors());
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

app.get("/projects", async (req, res, next) => {
  // connect to database on getting the projects page (in case user skips the index page)
  try {
    await db.connect();
    // query database for project records
    projects = await db.getAllProjects();

    if (!projects || projects.length === 0) {
      return res.status(404).send("No projects found in database");
    }
    res.render("projects.ejs", { projectArray: projects });
  } catch (err) {
    next(err); // send error to Express error handler
  }
});

// weather app page
app.get("/weather", (req, res) => {
  res.render("weather.ejs");
});

// individual project page
app.get("/project/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const project = await db.getProjectById(id);

    if (!project) {
      return res.status(404).render("error.ejs", {
        title: "Project Not Found (404)",
        body: "Sorry, the project your'e looking for doesn't exist.",
      });
    }

    res.render("project.ejs", { project: project });
  } catch (err) {
    next(err);
  }
});

// if no routes matched, show 404 page
app.use((req, res) => {
  res.status(404).render("error.ejs", {
    title: "Page Not Found (404)",
    body: "Sorry, the page you're looking for doesn't exist.",
  });
});

// general error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).render("error.ejs", {
    title: "Server Error (500)",
    body: "Something went wrong on our end.",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
