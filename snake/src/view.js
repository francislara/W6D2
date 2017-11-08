class View {
    constructor(board, $el) {
        this.board = board;
        this.setupGrid($el);
    }

    setupGrid($el) {
        let i = 0;
        this.board.grid.forEach(function(element) {
            let j = 0;
            const row = $('<ul class="row"></ul>');
            $el.append(row);
            element.forEach(() => {
                const $square = '<li class="square"></li>';
                
                if (this.board.snake.inSegment([i,j])) {
                    $square.addClass('snake');
                }
                row.append($square);
                j++;
            });
            i++;
        }, this);
    }
}

module.exports = View;