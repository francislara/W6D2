class Snake {
    constructor() {
        this.direction = 'E';
        this.segments = [[0,0]];
    }

    move() {
        const head = this.segments[0];
        switch (this.direction) {
            case 'E':
                head[0] += 1;
                break;
            case 'W':
                head[0] -= 1;
                break;
            case 'N':
                head[1] -= 1;
                break;
            case 'S':
                head[1] += 1;
                break;
        }
        let previous = head;
        for (let i = 1; i < this.segments.length; i++) {
            const temp = this.segments[i];
            this.segments[i] = previous;
            previous = temp;
        }
    }

    inSegment(pos) {
        const [x, y] = pos;
        this.segments.forEach((seg) => {
            console.log(seg[1]);
            if (seg[0] === x && seg[1] === y)  {
                return true;
            }
        });
        return false;
    }
}

module.exports = Snake;