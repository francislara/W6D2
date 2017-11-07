const View = require('./ttt-view')
const Game = require('./core/game');

$( () => {
  const game = new Game();
  const grid = $('figure');
  const view = new View(game, grid);
});

