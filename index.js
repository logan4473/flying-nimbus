const express = require('express');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DBuser,
    host: process.env.DBhost,
    database: process.env.DBdatabase,
    password: process.env.DBpassword,
    port: process.env.DBport,
  });

const app = express();

app.get('/',(req,res)=>{
    res.send("hello");
});

app.get('/ranks',(req,res)=>{
    pool.query('SELECT * FROM Ranks',(err,{rows})=>{
        err?res.send(err):res.send(rows);
    });
})

app.listen(4000,()=>{
    console.log("server running");
});