const express = require('express');
const { db } = require('./../server/db');
const { parsedData, keysToCamel } = require('./utils');

const statusRouter = express();

const getStatus = (avg, low, high) => {
  if (avg <= low || avg >= high) {
    return '2';
  } else if (avg - 10 <= low || avg + 10 >= high ) {
    return '1';
  }
  return '0';
}

const indices = {
  moisture: 0,
  light: 1,
  water: 2,
}

statusRouter.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM data ORDER BY stamp DESC LIMIT 10;');
    const thresholds = await db.query('SELECT * FROM thresholds');
    const {minMoisture, maxMoisture, minLight, maxLight} = keysToCamel(thresholds[0]);

    const prettyData = parsedData(data);

    const statuses = ['0', '0', '0'];
    Object.keys(prettyData).forEach((key) => {
      if (key !== 'stamp') {
        const avg = prettyData[key].reduce((a, b) => a + b) / prettyData[key].length;
        if (key === 'moisture') {
          const stat = getStatus(avg, minMoisture, maxMoisture);
          statuses[indices[key]] = stat;
          if (stat > 0) {
            statuses[2] = '1';
          }
        } else if (key === 'light') {
          const stat = getStatus(avg, minLight, maxLight);
          statuses[indices[key]] = stat;
        }
      }
    })
    res.status(200).json(statuses.join(''));
  } catch (err) {
    console.log(err.message);
  }
})

module.exports = statusRouter;