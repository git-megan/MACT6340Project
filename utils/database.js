import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Connection pool
let pool;

export async function connect() {
  // create the connection string
  let cString =
    "mysql://" +
    process.env.MYSQL_USER +
    ":" +
    process.env.MYSQL_PASSWORD +
    "@" +
    process.env.MYSQL_HOST +
    ":" +
    process.env.MYSQL_PORT +
    "/" +
    process.env.MYSQL_DATABASE;

  // Create the connection pool
  pool = mysql
    .createPool(
      // when using digital ocean, use cString here

      //for local db use the object below
      {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      }
    )
    .promise();
}

// query the database
export async function getAllProjects() {
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}
