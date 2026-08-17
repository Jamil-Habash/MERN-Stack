const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require('./routes/team.routes')(app);
require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port: ${port}`));