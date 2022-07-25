const { login, register } = require('../modules/userModule');

const express = require('express'),
    userRouter = express.Router();

userRouter.get('/login', (req, res) => {
    res.render('user/login');
})

userRouter.post('/login', async (req, res) => {
    var data = req.body;
    var res_data = await login(data.user_id, data.pass);
    console.log(res_data);
    if (res_data.suc > 0) {
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

userRouter.get('/register', (req, res) => {
    res.render('user/register')
})

userRouter.post('/register', async (req, res) => {
    var data = req.body;
    var req_data = await register(data)
    console.log(req_data);
    if (req_data.suc > 0) {
        res.redirect('/login')
    } else {
        res.redirect('/register')
    }
})

module.exports = { userRouter };