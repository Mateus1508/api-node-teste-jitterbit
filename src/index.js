const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const pkg = require('body-parser');
const routes = require('./routes.js');
const dbConnection = require('./database/database.js')

dotenv.config();
const { urlencoded } = pkg;

const server = express();
server.use(cors());
server.use(urlencoded({extended: false}));

server.use(express.json());
server.use(routes);

const PORT = process.env.PORT;
const PASS = process.env.PASS;

server.get('/', (req, res) => {
    return res.status(200).json({message: 'welcome'})
});

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    dbConnection(PASS)
})