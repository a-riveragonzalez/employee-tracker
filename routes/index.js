const express = require('express');
const mysql = require('mysql2');

const app = express();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'superlame',
      database: 'store_db'
    },
    console.log(`Connected to the movies_db database.`)
);

// Read all employees
app.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

module.exports = app;