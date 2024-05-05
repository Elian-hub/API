const mongoose = require('mongoose');
const jobScheemer = new mongoose.Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  Location: {
    type: String,
  },
  Salary: {
    type: String,
  },
});
const Jobs = mongoose.model('Jobs', jobScheemer);

module.exports = { Jobs };
