const dbConnection = require('../config/database')

const createUser = (email,password,username)=> {
   const query = `INSERT INTO tbl_user(username,email,password) VALUES ('${username}','${email}',SHA1('${password}'))`
   return dbConnection.execute(query)
}

const getSingleUser = (email,password) => {
    const query = `SELECT * FROM tbl_user WHERE email = '${email}' AND password = SHA1('${password}')`
    return dbConnection.execute(query)
}

const getSingleUserByid = (id) => {
    const query = `SELECT * FROM tbl_user WHERE id_user = ${id}`
    return dbConnection.execute(query)
}

module.exports = {
    createUser,
    getSingleUser,
    getSingleUserByid
}

