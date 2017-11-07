class View {
  constructor(game, $el) {
    this.game = game;
    this.setupBoard($el);
    this.bindEvents();
  }

  bindEvents() {
    this.list.on('click', (e) => {
      this.makeMove(e.target);
    });
  }

  makeMove(square) {
    try {
      const player = this.game.currentPlayer;
      this.game.playMove($(square).attr('pos').split(','));
      $(square).attr('player', player);
      $(`<p class="player">${player}</p>`).appendTo($(square));
      $(square).addClass('white');
      this.gameOver();
    } catch (e) {
      console.log('This square is not empty');
    }
  }

  setupBoard($el) {
    this.list = $('<ul class="grid"></ul>');
    $el.append(this.list);
    for (var i = 0; i < 9; i++) {
      const square = $('<li class="square"></li>');
      square.attr('pos', [i%3, Math.floor(i/3)]);
      this.list.append(square);
    }
  }

  gameOver() {
    if (this.game.isOver()) {
      if (this.game.winner()) {
        this.list.after(`<h1 class="game-end">${this.game.winner()} has won!</h1>`);
        $('li').each((index , el) => {
          console.log(el);
          if($(el).attr('player') === this.game.winner()) {
            $(el).addClass('green');
          }
        })
      } else {
        this.list.after('<h1 class="game-end">It\'s a draw!</h1>');
      }
      gameCompletionCallback();
    } else {
      // continue loop
      this.run(reader, gameCompletionCallback);
    }
  }
}

module.exports = View;
