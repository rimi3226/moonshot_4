# server.js
const express = require('express')
const path = require('path')
const Stream = require('node-rtsp-stream');
const socketIoClient = require('socket.io-client');
const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'index.html'));
});

const stream = new Stream({
    name: 'cam1',
    streamUrl: 'rtsp://localhost:8554/cam1', // Replace with your RTSP stream URL
    wsPort: 9999,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
});

const PORT = 3000;
app.listen(PORT, ()=>{
	console.log('Server is running');
});
