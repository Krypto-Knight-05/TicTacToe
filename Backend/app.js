import path from 'path';
import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
const PORT = 4444;

import { createServer } from 'http';
import { Server } from 'socket.io';
import Player from './model/Player.js';
import checkGameStatus from './GameLogic.js';

const app = express();

app.use(express.json()); //this middleware is needed for using axios - it parses the JSON coming into a usable javascript object(req)

app.use(cors({ //tells the browser to allow the requests coming from this URL
    origin: 'http://localhost:5173'
}))

app.use(express.urlencoded({ extended: true })); //for handling encoding of post requests

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:5173'
    }
});

io.on('connection', (socket)=>{
    let room = Math.floor(Math.random()*100);
    socket.join(room.toString());
    socket.emit('room', { room });
    console.log(`Socket ${socket.id} created and joined room ${room}`);
    room = room.toString();
    let grid = [
                -1, -1, -1,
                -1, -1, -1,
                -1, -1, -1
            ];
    let status = 'ongoing';

    socket.on('room', ({code})=>{
        socket.leave(room);
        room = code.toString();
        socket.join(code.toString());
        console.log(`Socket ${socket.id} joined room ${code}`);
        
        // Broadcast to room that someone joined
        socket.to(room).emit('playerJoined', { message: 'Opponent joined!' });
    });

    socket.on('turnChange', (data)=>{
        grid[data.index] = data.value;
        let Game = checkGameStatus(grid)
        console.log(`Socket ${socket.id} broadcasting to room ${room}:`, data);
        if(Game.status == 'win'){
            socket.to(room).emit('lose', data);
            socket.emit('win')
        }else if(Game.status == 'tie'){
            socket.to(room).emit('tie', data)
            socket.emit('tie')
        }else{ 
            socket.to(room).emit('turnChange', data);
        }
    });

    socket.on('restart', ()=>{
        grid = [ -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
        status = 'ongoing';
        socket.to(room).emit('restart')
    })

    socket.on('clearGrid', ()=>{
        grid = [ -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
        status = 'ongoing';
    })
    
    socket.on('UpdateGrid', (data)=>{
        grid[data.index] = data.value;        
    })

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});



mongoose.connect('mongodb://localhost:27017/player')
    .then(() => {
        httpServer.listen(4444, () => {
            console.log('http://localhost:4444')
        });
    })
    .catch(err => {
        console.log(err);
    })