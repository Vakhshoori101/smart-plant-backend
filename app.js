const express = require('express');
const cors = require('cors');

const dataRouter = require('./routes/data');
const thresholdsRouter = require('./routes/thresholds');
const statusRouter = require('./routes/status');

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    credentials: true,
  }),
);

app.use(express.json());

app.use('/data', dataRouter);
app.use('/thresholds', thresholdsRouter);
app.use('/status', statusRouter);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});