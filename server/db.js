const { Pool } = require('pg');
const pgp = require('pg-promise')({});
require('dotenv').config();

const cn = `postgres://${process.env.AWS_USER}:${encodeURIComponent(process.env.AWS_PASSWORD)}@${
  process.env.AWS_HOST
}:${process.env.AWS_PORT}/${process.env.AWS_DB_NAME}`; // For pgp
const db = pgp(cn);

module.exports = { db };
