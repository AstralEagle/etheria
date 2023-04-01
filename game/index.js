import Game from '../DB/schema/Game.js';
import Legend from '../DB/schema/Legend.js';

export const launchGame = async (gameId) => {

};
export const getLegends = async (gameId) => {
  try {
    const game = await Game.findByPk(gameId);
    const idLegends = [
      game.legend1,
      game.legend2,
      game.legend3,
      game.legend4,
      game.legend5,
      game.legend6];
    const legends = await Promise.all(idLegends.map((x) => Legend.findByPk(x)));
    return legends;
  } catch (e) {
    console.error(e);
  }
};

export const initTrun = async (gameId, legends) => {
  try {
    const legendTurns = await [...legends]
        .sort((x, y) => y.initiative - x.initiative - 1)
        .map((x) => legends.indexOf(x)+1)
        .join('');
    Game.update({legendTurns}, {where: {id: gameId}} );
  } catch (e) {
    console.error(e);
  }
};
