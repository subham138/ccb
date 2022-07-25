const express = require('express'),
    path = require('path'),
    oracledb = require('oracledb'),
    app = express(),
    port = process.env.PORT || 3000;

const db = require('./core/db');
const { reportRouter } = require('./router/reportRouter');
const { userRouter } = require('./router/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// DEFINE VIEW FILES
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/assets'));


app.set('view engine', 'ejs');

app.use(userRouter);
app.use(reportRouter);

app.get('/', (req, res) => {
    // console.log(db);
    res.redirect('/dashboard');
    res.render('dashboard');
})

app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`App is running at port: ${port}`);
})