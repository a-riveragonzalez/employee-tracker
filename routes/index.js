const express = require('express');
const mysql = require('mysql2');

const app = express();


// ****************** Connect to database ****************** //
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       password: 'superlame',
//       database: 'store_db'
//     },
//     console.log(`Connected to the store_db database.`)
// );

// ********************* Read Routes ********************* //
// Read all departments
app.get('/departments', (req, res) => {
  const sql = `SELECT * FROM department`;
  
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

// Read all roles
app.get('/roles', (req, res) => {
  const sql = `SELECT * FROM role`;
  
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

// ********************* Post Routes ********************* //
// add a department
app.post('/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (name)
  VALUES (?)`;
  const params = [body.name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// add a role
app.post('/new-role', ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)`;
  const params = [body.title, body.salary, body.department_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// add an employee
app.post('/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?, ?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id,];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// ********************* Update Route ********************* //
// todo update an employee role

module.exports = app;