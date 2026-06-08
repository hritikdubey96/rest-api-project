const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));

let users = [
    {
        id: uuidv4(),
        username:"Hritik Dubey"
    },
    {
        id: uuidv4(),
        username:"Rahul"
    }
];


app.get("/users",(req,res)=>{
    res.render("index",{users});
});
app.get("/users/new",(req,res)=>{
    res.render("new");
});
app.post("/users",(req,res)=>{

    let { username } = req.body;

    users.push({
        id: uuidv4(),
        username: username
    });

    res.redirect("/users");
});
app.get("/users/:id",(req,res)=>{

    let { id } = req.params;

    let user = users.find(
        (u) => u.id === id
    );

    if(!user){
        return res.send("User Not Found");
    }

    res.render("show",{user});
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});
