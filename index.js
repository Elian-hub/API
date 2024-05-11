const express = require('express');
const { JobsRoute } = require('./Controllers/jobsControllers');
const { UserRoutes } = require('./Controllers/usersControllers');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/jobs/v1', JobsRoute);
app.use('/users/v1', UserRoutes);

module.exports = app;
