const PORT = process.env.PORT || 8000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotEnv = require('dotenv');
const DB = require('./src/Database');

dotEnv.config({ path: 'config.env' });
DB();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const { WishRouter, PreweddingRouter } = require('./src/Routers');
app.use('/api/wish', WishRouter);
app.use('/api/prewedding', PreweddingRouter);

app.get('/', (req, res) => {
    res.render(__dirname + '/public/index.html', { port: PORT });
});

app.listen(PORT, () => console.log(`PORT ACTIVE IN ${PORT}`));

