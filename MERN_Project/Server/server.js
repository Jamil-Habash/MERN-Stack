const express = require('express');
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('dotenv').config();
const port = process.env.PORT;
require('./server/routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));