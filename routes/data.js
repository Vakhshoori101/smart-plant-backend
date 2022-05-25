const express = require('express');
const { parsedData } = require('./utils');
const { db } = require('./../server/db');

const dataRouter = express();

// add data
dataRouter.post('/', async (req, res) => {
  try {
    // humidity
    const { moisture, light, temperature, humidity } = req.query;
    await db.query(`INSERT INTO data
                    VALUES (current_timestamp, $(moisture), $(light), $(temperature), $(humidity));`,
                  {moisture, light, temperature, humidity});
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
  }
});

// get data
dataRouter.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM data ORDER BY stamp;');
    const prettyData = parsedData(data);
    res.status(200).json(prettyData);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = dataRouter;