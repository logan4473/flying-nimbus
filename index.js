require('dotenv').config();
const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });

const app = express();
app.use(cors());

const filter = (data)=>{
    const arr = [];
    data.forEach(i => {
        arr.push({username: i.username,score : i.score});
    });
    return arr;
}

app.get('/',(req,res)=>{
    res.send("hello");
});

app.get('/ranks',(req,res)=>{
    pool.query('SELECT * FROM Ranks',(err,data)=>{
        err?res.send(err):res.send(filter(data.rows));
    });
})

app.listen(4000,()=>{
    console.log('server running');
});