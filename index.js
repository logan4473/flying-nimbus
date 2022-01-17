require('dotenv').config();
const express = require('express');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

const app = express();

app.get('/',(req,res)=>{
    res.send("hello");
});

app.get('/ranks',(req,res)=>{
    pool.query('SELECT * FROM Ranks',(err,data)=>{
        err?res.send(err):res.send(data);
    });
})

app.listen(4000,()=>{
    console.log('server running');
});