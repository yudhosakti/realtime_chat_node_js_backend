const express = require('express');
const cors = require('cors')
const multer = require('multer');
const path = require('path')
const middleware = require('./src/middleware/log') 
const { createServer } = require("http");
const { Server } = require("socket.io");
const forumModel = require('./src/models/forum')
const globalFunction = require('./src/controller/global_function')
const forumRoutes = require('./src/routes/forum')
const personRoutes = require('./src/routes/person')




const fileStorage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null,'images/');
    },  
    filename: (req,res,cb) => {
       cb(null,new Date().getTime() + '-' + res.originalname)
    }
})

const fileFilter = (req,res,cb) => {
    if (res.mimetype == 'image/png' || res.mimetype == 'image/jpg' || res.mimetype == 'image/jpeg') {
        cb(null,true)
    }else{
        cb(null,false)
    }
}


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins. Adjust as needed.
        methods: ["GET", "POST"]
    }
});
let port = 4000;

app.use(middleware.logRequest);
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(multer({storage: fileStorage,fileFilter:fileFilter}).single('image'))

app.use(express.json())

app.use(cors())

app.use('/person',personRoutes)

app.use('/forum',forumRoutes)

io.on("connection", (socket) => {
    console.log('Connected');
    
    socket.on('sendMessage', async (data) => {
        try {
            // Insert the message into the forum
        await forumModel.insertRealtimeChatSingleForum(data.id_forum, data.id_user, data.message).then((value)=>{
            const [dataNew] = value
            console.log(dataNew[0][0])

            // Prepare the JSON data to be emitted
            let jsonData = {
                id_chat: dataNew[0][0].id_discuss,
                id_forum: dataNew[0][0].id_forum,
                id_user: dataNew[0][0].id_user,
                name: dataNew[0][0].username,
                message: dataNew[0][0].message,
                send_at: globalFunction.formatTanggalPesan(dataNew[0][0].send_at) 
            };
            // Emit the new message to all connected clients
            io.emit('newMessage', jsonData); 

            });
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
    });
    // Add any event listeners for the socket here
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});
  
httpServer.listen(port);



