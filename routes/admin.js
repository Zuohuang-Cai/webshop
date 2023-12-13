var express = require('express');
var router = express.Router();
let app = require('../app')
const pool = require("../bin/database.js");
/* GET users listing. */

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/setsession', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query("SELECT username FROM admin WHERE username = ?", [req.body.username], (err, rows) => {
      connection.release();
      if (rows.length === 0) {
        res.send("invaild username or password");
      } else {
        req.session.username = req.body.username;
        res.redirect('/admin');
      }
    });
  });
});
router.use((req, res, next) => {
  if (req.session.username == undefined) {
    res.render('login');
  }
  next();
})

router.get('/', function (req, res, next) {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM orders", (err, rows) => {
      connection.release();
      console.log(rows);
      res.render('admin', { 'user': rows });
    });
  })

});

router.get('/products', function (req, res, next) {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM products", (err, rows) => {
      connection.release();
      // console.log(rows);
      res.render('products', { 'Winkelwagen': rows });
    });
  })
});

router.get('/edit/:name', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("SELECT * FROM products", (err, rows) => {
      connection.release();
      // console.log(rows);
      let index = rows.findIndex(rows => rows.productnaam == req.params.name);
      res.render('add_product', { 'product': rows, 'index': index, "status": "update", 'name': 'Edit product' });
    });
  })
})

router.get('/remove/:name', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("DELETE FROM products WHERE id =?;", [req.params.name], (err, rows) => {
      connection.query("DELETE FROM winkelwagen WHERE id =?;", [req.params.name], (err, rows) => {
        connection.release();
        // console.log(rows);
        res.redirect('/admin/products');
      });
    });
  })
})

router.post('/update', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("UPDATE products SET productnaam = ?, prijs = ?, afbeelding_url = ? WHERE id =?", [req.body.name, parseFloat(req.body.prijs), req.body.afbeelding, parseFloat(req.body.old_name)], (err, rows) => {
      connection.query("UPDATE winkelwagen SET productnaam = ?, prijs = ? WHERE id =?", [req.body.name, parseFloat(req.body.prijs), parseFloat(req.body.old_name)], (err, rows) => {
        connection.release();
        if (err) {
          console.error("sql error:", err);
          res.status(500).send("sql error");
        }
        // console.log(rows);
        res.redirect('/admin/products');
      });
    });
  })
})

router.get('/add_product', (req, res, next) => {
  res.render('add_product', { 'name': 'voeg product', 'product': [{ "productnaam": "naam", "prijs": "prijs", "afbeelding_url": "afbeelding_url" }], "index": 0, "status": "toevoegen" })
})

router.post('/toevoegen', (req, res, next) => {

  pool.getConnection((err, connection) => {
    connection.query("insert INTO products SET productnaam = ?,prijs = ?, afbeelding_url = ?,afzet = 0", [req.body.name, parseFloat(req.body.prijs), req.body.afbeelding], (err, rows) => {
    });
    connection.query("insert INTO winkelwagen SET productnaam = ?,prijs = ?, afbeelding = ?,afzet = 0", [req.body.name, parseFloat(req.body.prijs), req.body.afbeelding], (err, rows) => {
      if (err) {
        console.error(err);
      }
      connection.release();
      console.log('123');
      res.redirect('/admin/products');
    });
  })
})

router.get('/reset', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("TRUNCATE TABLE products;", (err, rows) => {
      if (err) {
        console.log(err);
      }
    });
    connection.query("INSERT INTO products SELECT * FROM backup;", (err, rows) => {
      if (err) {
        console.log(err);
      }
      connection.release();
      res.redirect('/admin/products');
    });

  })
})

router.get('/opslag', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query("TRUNCATE TABLE backup;");
    connection.query("INSERT INTO backup SELECT * FROM products;", (err, rows) => {
      connection.release();
      res.redirect('/admin/products');
    });
  })
})
module.exports = router;
