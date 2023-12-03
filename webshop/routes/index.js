var express = require('express');
let mysql = require('mysql');
var router = express.Router();
const pool = require("../bin/database.js");

/* GET home page. */
router.get('/', function (req, res, next) {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM products", [req.body.username], (err, rows) => {
      connection.release();
      // console.log(rows);
      res.render('index', { "Winkelwagen": rows });

    });
  });
});
// add product
router.get('/add/:id/:afzet', (req, res, next) => {
  pool.getConnection((err, connection) => {
    console.log(parseInt(req.params.id));
    connection.query("SELECT afzet from winkelwagen WHERE id = ?", [parseInt(req.params.id)], (err, rows) => {
      console.log(rows);
      console.log(req.params);
      connection.query("UPDATE winkelwagen SET afzet = ?  WHERE id = ?", [rows[0].afzet + parseInt(req.params.afzet), parseInt(req.params.id)], (err, rows) => {
        if (err) {
          console.error(err)
        }
        connection.release();
        res.redirect('/');
      });
    });
  });

})
// betalen page
router.get('/betalen.ejs', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM winkelwagen", [req.body.username], (err, rows) => {
      connection.release();
      res.render('betalen', { 'Winkelwagen': rows, })
    });
  });
})

//check bal

router.get('/checkbal', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("SELECT afzet FROM winkelwagen where afzet!=0", (err, rows) => {
      connection.release();
      let flag = rows.map(row => row.afzet);
      if (flag.length) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });
})


// clear winkelwagen
router.get('/clearall', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("UPDATE winkelwagen set afzet = 0", [req.body.username], (err, rows) => {
      connection.release();
      res.redirect('betalen.ejs')
    });
  });
})
// afrond betalen + opslaan bestellen
router.get('/afrond/:totalprijs', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // console.log(req.params);
    connection.query("INSERT INTO orders (total) VALUES (?)", [parseFloat(req.params.totalprijs)], (err, rows) => {
      connection.release();
      res.redirect('/')
    });
  });
})


function gettime() {
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = currentTime.getMonth() + 1;
  let day = currentTime.getDate();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let amOrPm = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  let formattedTime = hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds + " " + amOrPm;
  let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
  return formattedDate + ' ' + formattedTime;
}
module.exports = router;
