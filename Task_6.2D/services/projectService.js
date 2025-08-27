const Project = require('../models/projectModel');

const getAllProjects = async () => {
  return await Project.find({});
};

module.exports = {
  getAllProjects
};
