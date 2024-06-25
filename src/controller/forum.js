const forumModels = require('../models/forum')

const getAllForum = async(req,response)=> {
   try {
      const [data] = await forumModels.getAllForum()
      if (data.length == 0) {
        response.status(404).json({
            message: "No Data Yet"
        })
      } else {
        response.json({
            data: data
        })
      }
    
   } catch (error) {
      response.status(500).json({
        message: error
      })
   }
}

const getAllMessageSingleForum = async(req,response)=> {
    const id = req.query.id
    try {
        const [data] = await forumModels.getAllMessageSingleForum(id)
        let dataFinal = []
        if (data.length == 0) {
            response.status(404).json({
                message: "No Data yet"
            })
        } else {
            for (let index = 0; index < data.length; index++) {
                 dataFinal.push({
                    id_forum: data[index].id_forum,
                    id_chat: data[index].id_discuss,
                    id_user: data[index].id_user,
                    name: data[index].username,
                    message: data[index].message,
                    send_at: formatTanggalPesan(data[index].send_at)
                 })
                
            }
            response.json({
                data: dataFinal
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const createMessageSingleForum = async(req,response)=> {
    const dataInsert = req.body
    try {
        await forumModels.createMessageSingleForum(dataInsert.id_forum,dataInsert.id_user,dataInsert.message).then((result) => {
            response.json({
                message: "Message Send Success"
            })
        }).catch((err) => {
            response.status(500).json({
                message: err
            })
        });
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

function formatTanggalPesan(tanggal) {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2,'0');
    const minnute = String(date.getMinutes()).padStart(2,'0');
    return `${year}-${month}-${day} ${hours}.${minnute}`;
  }

module.exports = {
    getAllForum,
    getAllMessageSingleForum,
    createMessageSingleForum
}