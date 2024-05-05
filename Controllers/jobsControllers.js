const { Jobs } = require('../Models/jobs');
const express = require('express');

const getAllJobs = async (req, res) => {
  try {
    const jobss = await Jobs.find();
    res.status(201).json({
      status: 'sucess',
      body: jobss,
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};
const postJobs = async (req, res) => {
  try {
    const jobs = await Jobs.create(req.body);
    console.log(req.body);
    res.status(200).json({
      status: 'sucess',
      message: 'Created successfully',
      body: jobs,
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err,
    });
  }
};
const JobsRoute = express.Router();
JobsRoute.route('/').get(getAllJobs).post(postJobs);
JobsRoute.route('/:id').patch().delete().get();

module.exports = { JobsRoute };
