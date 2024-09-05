const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.port || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); 
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
    id: uuidv4(),
    username : "anmolsharma",
    content : "How to be a Frontend developer?",
    reply: ""
},
{
    id: uuidv4(),
    username : "rohitsingh",
    content : "Is AWS better, or Google Cloud Platform for deployment?",
    reply: ""
},
{
    id: uuidv4(),
    username : "rahulkumar",
    content : "I got selected for my 1st internship!",
    reply: ""
}
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/edit/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);     
    res.redirect("/posts");
});

app.patch("/posts/reply/:id", (req, res) => {
    let {id} = req.params;
    let newReply = req.body.reply;
    let post = posts.find((p) => id === p.id);
    post.reply = newReply;
    console.log(post);     
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.get("/posts/:id/reply", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("reply.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

