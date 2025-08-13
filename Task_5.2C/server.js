const express = require("express");
const mongoose = require("mongoose");
const projectRoutes = require('./routes/projects');

const app = express();

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


app.use('/api/projects', projectRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
