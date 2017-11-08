const HanoiView = function (game, $el) {
    this.game = game;
    this.setupTowers($el);
    this.bindClicks();
};

HanoiView.prototype.bindClicks = function() {
    let startPos = -1;
    this.towers.forEach( function(element) {
        element.on('click', ()=> {
            if (startPos === -1) {
                startPos = element.attr('pos');
                element.addClass("selected");
            } else {
                if (this.game.move(startPos, element.attr('pos'))) {
                    this.makeUIMove(startPos, element.attr('pos'));
                    this.towers[startPos].removeClass("selected");
                    startPos = -1;
                    if(this.game.isWon()) {
                        this.gameOver();
                    }
                }
            }
        })
    }, this);
};

HanoiView.prototype.setupTowers = function($el) {
    this.towers = [];
    
    for (let i = 0; i < 3; i++) {
        $tower = $('<ul class="tower"></ul>');
        $tower.attr('pos', i);
        $el.append($tower);
        this.towers.push($tower);
        if(i === 0) {
            for(let i = 3; i > 0; i--) {
                $stone = $(`<li class="stone stone-${i}"></li>`);
                $stone.attr('stone-size', i);
                $tower.append($stone);                
            }
            
        }
    }
};

HanoiView.prototype.makeUIMove = function(start, end) {
    let startTower;
    this.towers.forEach( (tower) => {
        if(tower.attr('pos') === start) {
            startTower = tower.children().last()
            startTower.remove();
        }
    });
    this.towers.forEach((tower) => {
        if (tower.attr('pos') === end) {
            tower.append(startTower);
        }
    });
}

HanoiView.prototype.gameOver = function() {
    this.towers[this.towers.length - 1].parent().after('<h1 class="winner">You Win!</h1>');
    $(".stone").addClass("green");
};

// Hanoi.prototype.render = function() {
//     this.game.towers.forEach((tower) => {

//     });
// };

module.exports = HanoiView;