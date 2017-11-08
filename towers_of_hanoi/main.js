const HanoiView = require("./hanoi-view");
const HanoiGame = require("./core/game");

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});