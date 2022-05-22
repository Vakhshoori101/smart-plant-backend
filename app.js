const express = require('express');
const { db } = require('./server/db');

const app = express();
const PORT = 3001;

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});