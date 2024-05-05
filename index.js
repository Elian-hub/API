const express = require('express');
const { JobsRoute } = require('./Controllers/jobsControllers');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/jobs/v1', JobsRoute);

module.exports = app;
