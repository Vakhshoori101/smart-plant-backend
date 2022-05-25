const express = require('express');
const cors = require('cors');

const { db } = require('./server/db');
const parsedData = require('./routes/utils.js');

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    credentials: true,
  }),
);

app.post('/add', async (req, res) => {
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

app.get('/', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM data ORDER BY stamp;');
    const prettyData = parsedData(data);
    res.status(200).json(prettyData);
  } catch (err) {
    console.log(err.message);
  }
})

const low = 20;
const high = 80;

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

app.get('/status', async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM data ORDER BY stamp DESC LIMIT 10;');
    const prettyData = parsedData(data);

    const statuses = ['0', '0', '0'];
    Object.keys(prettyData).forEach((key) => {
      if (key !== 'stamp') {
        const avg = prettyData[key].reduce((a, b) => a + b) / prettyData[key].length;
        if (key === 'moisture') {
          const stat = getStatus(avg, low, high);
          statuses[indices[key]] = stat;
          if (stat > 0) {
            statuses[2] = '1';
          }
        } else if (key === 'light') {
          const stat = getStatus(avg, low, high);
          statuses[indices[key]] = stat;
        }
      }
    })
    console.log(statuses);
    res.status(200).json(statuses.join(''));
  } catch (err) {

  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});