const { F_Select, Call_Procedure } = require("../core/master");

const GetPacsDtls = async () => {
    return new Promise(async (resolve, reject) => {
        var pax_id = 'default',
            fields = 'pax_id id, name',
            table_name = 'md_pax_dtls',
            where = null,
            order = null,
            flag = 1;
        var data = await F_Select(pax_id, fields, table_name, where, order, flag);
        resolve(data);
    })
}

const getDetails = (pax) => {
    return new Promise(async (resolve, reject) => {
        var pax_id = pax,
            fields = `EMP_ID, EMP_NAME, EMP_NO, TO_DATE(HIRE_DATE, 'dd/mm/yyyy') HIRE_DATE, JOB, SALARY`,
            table_name = 'EMPLOYEE',
            where = null,
            order = null,
            flag = 1;
        var data = await F_Select(pax_id, fields, table_name, where, order, flag);
        resolve(data);
    })
}

const CallProcedure = (pax, branch_id, acc_type, date) => {
    return new Promise(async (resolve, reject) => {
        var data = await Call_Procedure(pax, branch_id, acc_type, date);
        resolve(data);
    })

}

const GetBrunch = (pax) => {
    return new Promise(async (resolve, reject) => {
        var pax_id = pax,
            fields = `BRN_CD ID, BRN_NAME NAME`,
            table_name = 'M_BRANCH',
            where = null,
            order = null,
            flag = 1;
        var data = await F_Select(pax_id, fields, table_name, where, order, flag);
        resolve(data)
    })
}

const GetAccType = (pax) => {
    return new Promise(async (resolve, reject) => {
        var pax_id = pax,
            fields = `ACC_TYPE_CD ACC_TYPE, ACC_TYPE_DESC NAME`,
            table_name = 'MM_ACC_TYPE',
            where = null,
            order = null,
            flag = 1;
        var data = await F_Select(pax_id, fields, table_name, where, order, flag);
        resolve(data)
    })
}

const GetReport = (pax) => {
    return new Promise(async (resolve, reject) => {
        var pax_id = pax,
            fields = `ACC_NUM, CUST_NAME, OPENING_DT, CONSTITUTION_DESC, BALANCE`,
            table_name = 'TT_SBCA_DTL_LIST',
            where = null,
            order = null,
            flag = 1;
        var data = await F_Select(pax_id, fields, table_name, where, order, flag);
        resolve(data)
    })
}

module.exports = { GetPacsDtls, getDetails, CallProcedure, GetBrunch, GetAccType, GetReport }