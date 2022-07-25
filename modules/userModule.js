const bcrypt = require('bcrypt');
const { F_Select, F_Insert } = require('../core/master');
const dateformat = require('dateformat');

const login = (user_id, password) => {
    return new Promise(async (resolve, reject) => {
        var pax_id = 'default',
            fields = 'id, user_id, pass, user_name',
            table_name = 'md_users',
            where = `user_id = '${user_id}'`,
            order = '',
            flag = 0;
        var data = await F_Select(pax_id, fields, table_name, where, order, flag);
        var res_data = '';
        if (await bcrypt.compare(password, data.PASS.trim())) {
            res_data = { suc: 1, msg: data }
        } else {
            res_data = { suc: 0, msg: 'Please check your userid or password' }
        }
        resolve(res_data);
    })
}

const register = ({ user_name, user_id, pass, remarks }) => {
    return new Promise(async (resolve, reject) => {
        var datetime = dateformat(new Date(), "yyyy-mm-dd HH:MM:ss")
        var password = bcrypt.hashSync(pass, 10);
        var pax_id = 'default',
            table_name = 'MD_USERS',
            fields = 'USER_ID, PASS, USER_NAME, REMARKS, CREATED_BY, CREATED_DT',
            values = `'${user_id}', '${password}', '${user_name}', '${remarks}', '${user_name}', TO_DATE('${datetime}', 'yyyy-mm-dd hh24:mi:ss')`,
            flag = 0;
        var data = await F_Insert(pax_id, table_name, fields, values, flag);
        resolve(data);
    })
}

module.exports = { login, register };