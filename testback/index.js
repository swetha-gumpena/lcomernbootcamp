const express = require("express");
const app = express()

const port = 8000

app.get("/",(req,res) => {
    return res.send("Home page")
})

const isLoggedIn = (req,res,next) => {
    console.log("You have logged in");
    next();
}

const isAdmin = (req,res,next) => {
    console.log("You are verified to be admin");
    next();
}

const admin = (req,res,next) => {
    return res.send("This is admin dashboard");
}

app.get("/admin",isLoggedIn,isAdmin,admin);

app.listen(port, () => {
    console.log("Server is up and running");
})