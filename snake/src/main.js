const Board = require('./board');
const View = require('./view');

$(() => {
    const board = new Board();
    const $el = $('.snake-game');
    const view = new View(board, $el);
});