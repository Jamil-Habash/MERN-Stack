const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();
const port = process.env.PORT;
require('./server/routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));