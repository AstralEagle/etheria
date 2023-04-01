import express from 'express';
import 'dotenv/config.js';
import './ws/index.js';

import Sequelize from './DB/index.js';

import authRouter from './route/auth.js';
import gameRouter from './route/game.js';

Sequelize.sync().then(() => {
  console.log('DB is ready');
});

const app = express();
const port = 3000;

// Création du serveur WebSocket


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth', authRouter);
app.use('/game', gameRouter);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API Etheria démarrée sur le port ${port}`);
});
