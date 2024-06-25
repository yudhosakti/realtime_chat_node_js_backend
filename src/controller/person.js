const personModel = require('../models/person')

const loginUser = async(req,response)=> {
   const dataInsert = req.body
   console.log(dataInsert)
   try {
     const [data] = await personModel.getSingleUser(dataInsert.email,dataInsert.password)
     if (data.length == 0) {
        response.status(404).json({
            message: "User Not Found"
        })
     } else {
        response.json({
            message: "Login Success",
            data: {
                id_user: data[0].id_user,
                name: data[0].username,
                email: data[0].email,
                password: data[0].password
            }
        })
     }
   } catch (error) {
      response.status(500).json({
        message: error
      })
   }
}

const getSingleUser = async(req,response) => {
    const id_user = req.query.id
    try {
        const [data] = await personModel.getSingleUserByid(id_user)
        if (data.length == 0) {
            response.status(404).json({
                message: "User Not Found"
            })
        } else {
            response.json({
                data: data[0]
            })
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const createUser = async(req,response)=> {
    const dataInsert = req.body
   try {
       await personModel.createUser(dataInsert.email,dataInsert.password,dataInsert.username).then(async()=> {
           const [data] = await personModel.getSingleUser(dataInsert.email,dataInsert.password)
           if (data.length == 0) {
             response.status(404).json({
                message: "Terjadi Kesalahan"
             })
           } else {
            response.json({
                data: {
                    id_user: data[0].id_user,
                    name: data[0].username,
                    email: data[0].email,
                    password: data[0].password
                }
            })
           }
       })
    
   } catch (error) {
      response.status(500).json({
        message: error
      })
   }
}


module.exports = {
    loginUser,
    createUser,
    getSingleUser
}