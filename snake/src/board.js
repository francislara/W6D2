const Snake = require('./snake');

class Board {
    constructor() {
        this.makeGrid();
        this.snake = new Snake();
    }

    makeGrid() {
        this.grid = [];
        for (var i = 0; i < 10; i++) {
            this.grid.push([]);
            for (var j = 0; j < 10; j++) {
                this.grid[i].push([]);
            }
        }
    }
}

module.exports = Board;