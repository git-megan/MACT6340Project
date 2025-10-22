import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";

// example data to populate projects
//let data = ["Project 1", "Project 2", "Project 3"];

// data from db for projects
let projects = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

// get the different pages of the app
app.get("/", async (req, res) => {
  // connect to database on getting the index page
  try {
    await db.connect();
    // query database for project records
    projects = await db.getAllProjects();
    console.log(projects);
    res.render("index.ejs"); // render index page only after getting project records
  } catch (err) {
    next(err); // send error to error handler
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
  // res.render("projects.ejs", { projectArray: data }); // using fake data for demo purposes only
  res.render("projects.ejs", { projectArray: projects });
});

// individual project page
app.get("/project/:id", (req, res) => {
  let id = req.params.id;
  if (id > data.length) {
    throw new Error("No project with that ID");
  }

  res.render("project.ejs", { projectArray: data, which: id });
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
