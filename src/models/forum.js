const dbConnection = require('../config/database')

const getAllForum = ()=> {
    const query = `SELECT * FROM tbl_forum `
    return dbConnection.execute(query)
}

const createMessageSingleForum = (id_forum,id_user,message) => {
   const query = `INSERT INTO tbl_discuss(id_forum,id_user,message) VALUES (${id_forum},${id_user},'${message}')`
   return dbConnection.execute(query)
}

const getAllMessageSingleForum = (id_forum)=> {
    const query = `SELECT * FROM tbl_discuss INNER JOIN tbl_user ON tbl_discuss.id_user = tbl_user.id_user WHERE tbl_discuss.id_forum = ${id_forum} ORDER BY tbl_discuss.send_at DESC`
    return dbConnection.execute(query)
}

const insertRealtimeChatSingleForum = (id_forum,id_user,message) => {
    const query = `CALL SendMessageRealtime(${id_forum},${id_user},'${message}');`
    return dbConnection.execute(query);
}
module.exports = {
    getAllForum,
    createMessageSingleForum,
    getAllMessageSingleForum,
    insertRealtimeChatSingleForum
}