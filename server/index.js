const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
//require("dotenv").config();
const bodyParser = require("body-parser");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const SALT_WORK_FACTOR = 10;
var path = require('path');

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

const conn = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b09042b989ce16',
  password:'a52e74ec',
  database:'heroku_77e0386e8b781cf'
});

conn.connect(err => {
    if (err) return err
});

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/test' ,function(req,res){
  console.log(conn)
  res.end()
})

app.get('/article/:id?',(req,res)=>{
    const paramId = req.params.id;
    //const queryId = req.query.id;
    var id = (!paramId) ? '1': 'artID ='+paramId;
    const SELECT_ARTICLE = `SELECT * FROM article WHERE ${id}`
    console.log(SELECT_ARTICLE);
    conn.query(SELECT_ARTICLE,(err,data)=>{
        if (err) return res.send(err)
        else res.send(data)
    })
})
app.post('/addart',(req,res)=>{
  const {body} = req.body;
  const obj = JSON.parse(body);
  const ADD_ART = `INSERT INTO article VALUES('','${obj.artName}','${obj.artDetail}','${obj.status}')`
  conn.query(ADD_ART,(err,data)=>{
    if (err) return res.send(err)
    else res.send('Add Article Successful !!')
  })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
