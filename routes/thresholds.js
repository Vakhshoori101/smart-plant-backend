const express = require('express');
const { db } = require('./../server/db');
const { keysToCamel } = require('./utils');

const thresholdsRouter = express();

// get thresholds
thresholdsRouter.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM thresholds;');
    res.status(200).json(keysToCamel(data[0]));
  } catch (err) {
    console.log(err.message);
  }
});

// update thresholds
thresholdsRouter.put('/', async (req, res) => {
  try {
    const {
      minMoisture,
      maxMoisture,
      minLight,
      maxLight,
      minTemperature,
      maxTemperature,
      minHumidity,
      maxHumidity
    } = req.body;
    await db.query(
      `DELETE FROM thresholds;
      INSERT INTO thresholds VALUES ($(minMoisture), $(maxMoisture), $(minLight), $(maxLight), $(minTemperature), $(maxTemperature), $(minHumidity), $(maxHumidity));`,
      {
        minMoisture,
        maxMoisture,
        minLight,
        maxLight,
        minTemperature,
        maxTemperature,
        minHumidity,
        maxHumidity
      }  
    );
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = thresholdsRouter;