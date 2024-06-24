const express = require("express");
const path = require("path");

const app=express();

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/index.html'))
})
app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/about.html'))
})

app.listen(8080,()=>{
    console.log("Server started on port 8080")
})