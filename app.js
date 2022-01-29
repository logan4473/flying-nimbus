require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 4000 ;
const Pool = require('pg').Pool;
const cors = require('cors');
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
      },
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
    res.sendFile(__dirname + '/index.html');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
});

app.get('/ranks',(req,res)=>{
    pool.query('SELECT * FROM Ranks',(err,data)=>{
        err?res.send(err):res.send(filter(data.rows));
    });
});

app.listen(port,()=>{
    console.log('server running');
});