const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hiroki1678',
    database: 'stock_app'
  });

connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
});

app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.get('/index', (req, res) => {
    connection.query(
        'SELECT * FROM items',
        (error, results) => {
        res.render('index.ejs', {items: results})
        }
    )
});

app.get('/new', (req, res) => {
    res.render('new.ejs')
});

app.post('/create', (req, res, next) => {
    const itemName = req.body.itemName;
    if (itemName === " ") {
        res.redirect('/index')
    } else {
        next();
    }},
    (req, res) => {
        connection.query(
        'insert into items (name) values (?)',
        [req.body.itemName],
        (error, results) => {
            res.redirect('/index');
        })
    }
);

app.post('/delete/:id', (req, res) => {
    connection.query(
        'delete from items where id = ?',
        [req.params.id],
        (error, results) => {
            res.redirect('/index')
        }
    )
})

app.listen(process.env.PORT || 3000);

