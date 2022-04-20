const { faker } = require('@faker-js/faker');
const mysql = require('mysql');
const bodyParser  = require("body-parser");
const express = require('express');
 
const app = express();
 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
 
app.listen(3000, function () {
 console.log('App listening on port 3000!');
});
 
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

app.get("/", function(req, res){
    // Find count of users in DB
    const q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;
        const count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    const person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

