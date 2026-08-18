const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/mongoose.config');
const app = express();

app.use(cors());
app.use(express.json());

require('./routes/team.routes')(app);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port: ${port}`));