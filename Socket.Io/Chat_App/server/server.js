const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/config/mongoose.config');

const port = process.env.PORT;

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));
const io = require('socket.io')(server, {cors: true});

io.on("connection", socket => {
    console.log("Nice to meet you. (shake hand)");
    socket.on("event_from_client", data=> {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    });
});