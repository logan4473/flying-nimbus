require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000 ;
const Pool = require('pg').Pool;
const cors = require('cors');
const isProduction = process.env.NODE_ENV === "production";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      },
  });

pool.connect();

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
    res.sendFile(__dirname + '/index.html');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
});


app.get('/game',(req,res)=>{
    res.sendFile(__dirname + '/game.html');
});

app.get('api/ranks',(req,res)=>{
    pool.query('SELECT * FROM Ranks',(err,data)=>{
        err?res.send(err):res.send(filter(data.rows));
    });
});

app.listen(port,()=>{
    console.log('server running');
});