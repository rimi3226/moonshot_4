const express =require('express')
const path = require('path')
const socketIoClient = require('socket.io-client');
const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log('Server is running');
});