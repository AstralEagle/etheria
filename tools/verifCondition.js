export const selectTurn = (game, userId) => {
  const player1 = [1, 4, 5];
  const player2 = [2, 3, 6];
  console.log(game, userId);
  return ((player1.includes(game.selectChamp) && game.player1 === userId) ||
      (player2.includes(game.selectChamp) && game.player2 === userId));
};
export default {selectTurn};
