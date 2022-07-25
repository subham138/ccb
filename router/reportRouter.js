const express = require('express'),
    reportRouter = express.Router(),
    dateformat = require('dateformat');

const { GetPacsDtls, getDetails, CallProcedure, GetBrunch, GetAccType, GetReport } = require('../modules/reportModule');


reportRouter.get('/dashboard', async (req, res) => {
    var data = await GetPacsDtls();
    res.render('dashboard/index', { data });
})

reportRouter.get('/report', async (req, res) => {
    var data = await GetPacsDtls();
    res.render('dashboard/report', { data });
})

reportRouter.get('/get_details', async (req, res) => {
    var data = await getDetails(req.query.pacs_id)
    // console.log(data);
    res.send(data);
})

reportRouter.get('/call_procedure', async (req, res) => {
    await CallProcedure(5);
})

reportRouter.get('/get_acc_type', async (req, res) => {
    var data = await GetAccType(req.query.pacs_id)
    res.send(data);
})

reportRouter.get('/get_brunch', async (req, res) => {
    var data = await GetBrunch(req.query.pacs_id)
    res.send(data);
})

reportRouter.get('/get_report', async (req, res) => {
    var date = dateformat(req.query.date, 'dd/mm/yyyy'),
        pacs_id = req.query.pacs_id,
        accept_type = req.query.acc_type,
        branch_id = req.query.branch_id;
    console.log(pacs_id, branch_id, accept_type, date);
    var data = await CallProcedure(pacs_id, branch_id, accept_type, date)
    // console.log('date', date);
    res.send(data);

    // var data = await GetReport(req.query.pacs_id)
    // res.send(data);
})

module.exports = { reportRouter }