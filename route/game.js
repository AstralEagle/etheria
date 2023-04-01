import Express from 'express';
import {wsConnection, gamesConnection} from '../ws/index.js';

import {selectTurn} from '../tools/verifCondition.js';
import {getLegends, initTrun} from '../game/index.js';


import Game from '../DB/schema/Game.js';
import Legend from '../DB/schema/Legend.js';

import auth from '../middleware/auth.js';

const router = Express.Router();
router.get('/', async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});
router.post('/', auth, async ( req, res) => {
  try {
    const game = await Game.create({player1: req.userId});
    gamesConnection.set(game.id, []);
    wsConnection.forEach((ws) => {
      ws.send(`Message envoyer`);
    });
    res.status(201).json(game);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});
router.post('/legend', auth, async ( req, res) => {
  try {
    const game = await Legend.create({
      player: req.userId,
      name: req.body.name || 'test',
      maxLife: req.body.life || 100,
      life: 100,
      maxMove: req.body.move || 3,
      move: 3,
      initiative: req.body.init || 5,
    });
    res.status(201).json(game);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});
router.post('/:gameId/select/:legendId', auth, async (req, res) => {
  try {
    const {gameId, legendId} = req.params;
    const game = await Game.findByPk(gameId);
    if (!selectTurn(game, req.userId)) {
      throw new Error('Unauthorized');
    }
    const option = {selectChamp: game.selectChamp+1};
    option[`legend${game.selectChamp}`] = legendId;
    await Game.update(option, {where: {id: gameId}});
    const userConnected = gamesConnection.get(parseInt(gameId));
    userConnected?.map((x) => x.user.send(`Legend ${legendId} is Selected`));
    res.status(200).json({message: 'Legend selected'});
    if (game.selectChamp === 6) {
      console.log(`Game${gameId}===> Fin de la selection des legends`);
    }
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});
router.post('/join/:id', auth, async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game.player1 === req.userId) {
      throw new Error('Can\'t join this game');
    }
    if (game.player2) {
      throw new Error('game is full');
    }
    await Game.update({player2: req.userId}, {where: {id: req.params.id}});
    res.status(200).json({message: 'Game joined'});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});
router.get('/:id', auth, async (req, res) => {
  try {
    const legends = await getLegends(req.params.id);
    await initTrun(req.params.id, legends);
    res.status(200).json({legends});
  } catch (e) {
    console.error(e);
    res.status(500).json({error: e.message});
  }
});


export default router;
