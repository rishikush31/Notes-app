//import express
const path=  require('path');

const express = require('express');

//create instance of server
const app = express();

//middleware to parse json req body
app.use(express.json({limit: '50mb'}));

//cors required for external server use
const cors =require ("cors");   
app.use(cors());

app.use(express.static(path.resolve(__dirname,'../build')));

//start server
const port = 5000;
app.listen(port , ()=>{
    console.log(`server started at port ${port}`);
});

//default route
app.get('/',(request,response)=>{
    response.send("done");
});

//react route setup
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
  
//add /api/createUser route to router
const createUser=require("./Routes/user");
app.use('/api/',createUser);

//add /api/createNote route to router
const createNote=require("./Routes/note");
app.use('/api/',createNote);

//add /api/login route to router
const logintemp=require("./Routes/login");
app.use('/api/',logintemp);

//add /api/getMyNotes route to router
const getMyNotes=require("./Routes/myNotes");
app.use('/api/',getMyNotes);

//add /api/updateNote route to router
const updateNote=require("./Routes/update");
app.use('/api/',updateNote);

//add /api/deleteNote route to router
const deleteNote=require("./Routes/delete");
app.use('/api/',deleteNote);

//add /api/deleteUser route to router
const deleteUser=require("./Routes/deleteuser");
app.use('/api/',deleteUser);

//add /api/uploadProfilePic route to router
const uploadProfilePic=require("./Routes/profile");
app.use('/api/',uploadProfilePic);

//connect to database
const dbconnect=require("./database");
dbconnect();