// Reference Variables
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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




// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
  
// App listening on local server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT} 🚀`);
});