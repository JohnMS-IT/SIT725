const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB');

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

const sampleData = [
  {
    title: "Kitten 1",
    image: "images/kitten.jpg",
    link: "About Kitten 1",
    description: "adorable kitten",
  },
  {
    title: "Kitten 2",
    image: "images/kitten2.jpg",
    link: "About Kitten 2",
    description: "Loves to nap in the sun",
  },
  {
    title: "Kitten 3",
    image: "images/kitten3.jpg",
    link: "About Kitten 3",
    description: "meet biscoff"
  }
];

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));