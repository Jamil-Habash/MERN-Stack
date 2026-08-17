const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/config/mongoose.config');

const port = process.env.PORT;
require('./server/routes/product.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));