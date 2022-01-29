require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 4000 ;
const Pool = require('pg').Pool;
const cors = require('cors');
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  });
  module.exports = pool;
const app = express();
app.use(cors());

app.use(express.static("public"))

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

app.listen(port,()=>{
    console.log('server running');
});