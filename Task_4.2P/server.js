var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define schema and model
const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String
});
const Project = mongoose.model('Project', ProjectSchema);

// API route to get projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Internal Server Error", error: error.message });
  }
}); 

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App listening on port: " + port);
});
