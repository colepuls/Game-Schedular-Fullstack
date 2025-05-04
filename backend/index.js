const express = require('express');
const cors = require('cors');
const games = require('./routes/games');
const perf = require('./routes/performance');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/games', games);
app.use('/performance', perf);

app.listen(3001, () => console.log('API listening on :3001'));