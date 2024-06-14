const express = require("express");

const app=express();


app.get("/",(req,res)=>{
    res.send("This is your homepage")
})

app.get("/test-endpoint",(req,res)=>{
    console.log("Got a GET request!")
    res.send("This is your response")
})


app.listen(8080,()=>{
    console.log("Server started on port 8080")
})