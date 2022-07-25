const db_details = require('./db'),
    oracledb = require('oracledb');
oracledb.autoCommit = true;

const F_Select = (pax_id, fields, table_name, where, order, flag) => {
    return new Promise(async (resolve, reject) => {
        where = where ? `WHERE ${where}` : '';
        order = order ? order : '';
        // console.log(db_details[pax_id]);
        const pool = await oracledb.createPool(db_details[pax_id]);
        const con = await pool.getConnection();
        let sql = `SELECT ${fields} FROM ${table_name} ${where} ${order}`
        // console.log(sql);
        const result = await con.execute(sql, [], {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        let rs = result.resultSet
        // console.log(rs);
        var data = flag > 0 ? await rs.getRows() : await rs.getRow(); // 0-> Single DataSet; 1-> Multiple DataSet
        // console.log(await rs.getRows());
        await con.close();
        await pool.close();
        resolve(data);
    })
}

const F_Insert = (pax_id, table_name, fields, values, where, flag) => {
    return new Promise(async (resolve, reject) => {
        const pool = await oracledb.createPool(db_details[pax_id]);
        const con = await pool.getConnection();
        let sql = flag > 0 ? `UPDATE "${table_name}" SET ${fields} WHERE ${where}` :
            `INSERT INTO "${table_name}" (${fields}) VALUES (${values})`; // 0-> INSERT NEW DATA; 1-> UPDATE TABLE DATA
        // console.log(sql);
        await con.execute(sql, async (err, result) => {
            if (err) {
                console.log(err);
                res_data = { suc: 0, msg: err }
            } else {
                res_data = { suc: 1, msg: result }
            }
            await con.close();
            resolve(res_data)
        });
    })
}

const Call_Procedure = async (pax, branch, acc_type, date) => {
    return new Promise(async (resolve, reject) => {
        const pool = await oracledb.createPool(db_details[pax]);
        const con = await pool.getConnection();
        let query = `DECLARE
    BRNCD VARCHAR2(200);
    ACCTYPECD NUMBER;
    ADT_DT DATE;
    BEGIN
    BRNCD := '${branch}';
    ACCTYPECD := ${acc_type};
    ADT_DT := to_date('${date}','dd/MM/yyyy');

    P_SBCA_DETAILED_LIST_NEW(
        BRNCD => BRNCD,
        ACCTYPECD => ACCTYPECD,
        ADT_DT => ADT_DT
    );
    END;`
        await con.execute(query);
        const r = await con.execute('SELECT * FROM TT_SBCA_DTL_LIST', [], {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        let rs = r.resultSet
        // console.log(rs);
        var data = await rs.getRows();
        // console.log(data);
        await con.close();
        await pool.close();
        resolve(data);
    })


}

module.exports = { F_Select, F_Insert, Call_Procedure }