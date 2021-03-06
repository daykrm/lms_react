const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
var path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;
const withAuth = require("./middleware.js");

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();
  app.use(cookieParser());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  app.get("/api/article/:id?", (req, res) => {
    const paramId = req.params.id;
    //const queryId = req.query.id;
    var id = !paramId ? "1" : "artID =" + paramId;
    const SELECT_ARTICLE = `SELECT * FROM article WHERE ${id}`;
    console.log(SELECT_ARTICLE);
    pool.getConnection(function(error, conn) {
      conn.query(SELECT_ARTICLE, (err, data) => {
        if (err) return res.send(err);
        else res.send(data);
        conn.release();
        // Handle error after the release.
        if (error) throw error;
      });
    });
  });
  app.get("/api/cstoken", (req, res) => {
    const payload = {
      iss: process.env.CS_ID,
      iat: 1511963669
    };
    const cstoken = jwt.sign(payload, process.env.CS_SECRET, {
      expiresIn: "1h"
    });
    res.send(cstoken)
  });

  app.post("/addart", (req, res) => {
    const { body } = req.body;
    const obj = JSON.parse(body);
    const ADD_ART = `INSERT INTO article VALUES('','${obj.artName}','${obj.artDetail}','${obj.status}')`;
    pool.getConnection(function(error, conn) {
      conn.query(ADD_ART, (err, data) => {
        if (err) return res.send(err);
        else res.send("Add Article Successful !!");
        conn.release();
        // Handle error after the release.
        if (error) throw error;
      });
    });
  });

  app.get("/*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  app.post("/reg", (req, res) => {
    const { body } = req.body;
    var obj = JSON.parse(body);
    bcrypt.hash(obj.password, salt, (err, hash) => {
      if (err) return res.send(err);
      const INSERT = `INSERT INTO users VALUES('','${obj.username}','${hash}','${obj.firstName}','${obj.lastName}')`;
      pool.getConnection(function(error, conn) {
        conn.query(INSERT, (err, result) => {
          if (err) {
            return res.send(err);
          } else {
            res.send("Add user successful!!");
          }
          conn.release();
          // Handle error after the release.
          if (error) throw error;
        });
      });
    });
  });

  app.post("/login", (req, res) => {
    var { body } = req.body;
    var obj = JSON.parse(body);
    const SELECT = `SELECT * FROM users WHERE username ='${obj.username}'`;
    pool.getConnection(function(error, conn) {
      conn.query(SELECT, (err, user) => {
        if (err) return res.send(err);
        else if (user.length === 0) return res.send("ไม่มีชื่อผู้ใช้นี้ในระบบ");
        else {
          const db = user[0].firstname;
          const db2 = user[0].lastname;
          const db_data = user[0];
          var hash = user[0].password;
          console.log(db_data);
          bcrypt.compare(obj.password, hash, function(err, isMatch) {
            if (err) return res.send(err);
            if (!isMatch) return res.send("รหัสผ่านไม่ถูกต้อง");
            else {
              const payload = { username: obj.username, name: db, lname: db2 };
              const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: "1h"
              });
              res.cookie("token", token, { httpOnly: true }).sendStatus(200);
              //res.send(token)
            }
          });
        }
        conn.release();
        // Handle error after the release.
        if (error) throw error;
      });
    });
  });

  app.get("/api/secret", withAuth, function(req, res) {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      res.send(decoded);
    });
  });

  app.get("/api/chkToken", withAuth, function(req, res) {
    res.sendStatus(200);
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
  });
}
