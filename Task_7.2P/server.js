const express = require("express");
const mongoose = require("mongoose");
const projectRoutes = require('./routes/projects');

const app = express(); // Define app FIRST

const http = require('http').createServer(app); 
const io = require('socket.io')(http); // Pass http server to socket.io

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


io.on('connection', (socket) => {
    console.log('a user connected');
   
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
   
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

app.use('/api/projects', projectRoutes);

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log("App listening on port: " + port);
});