import {WebSocketServer} from 'ws';
import jwt from 'jsonwebtoken';


export const wsConnection = [];
export const gamesConnection = new Map();


const wss = new WebSocketServer({
  port: 8080,
});
// Connexion WebSocket
wss.on('connection', (ws, req) => {
  console.log('Nouvelle connexion WebSocket !');
  wsConnection.push(ws);
  const token = req.headers['sec-websocket-protocol'];

  // Réception de messages
  ws.on('message', (message) => {
    try {
      const {type, data} = JSON.parse(message);
      if (type === 'joinGame') {
        joinGame(ws, data.id, token);
      }
    } catch (e) {
      console.error(e);
    }
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const joinGame = async ( user, gameId, token) => {
  try {
    const game = gamesConnection.get(gameId);
    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    game.push({userID: decodedToken, user});
  } catch (e) {
    console.error(e);
  }
};

