class Enemy {
    constructor(yPosition, xPosition) {
        this.speed = Math.ceil((Math.random() * 2) + 2);
        this.x = xPosition;
        this.y = yPosition;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        if (this.x > 505) {
            this.x = -100;
            this.speed = Math.ceil((Math.random() * 2) + 2);
        }
        this.x += this.speed;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = 380;
        this.sprite = 'images/char-cat-girl.png';
    }

    update() {
        if (this.y <= -20)
            this.y += 320;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x !== 0)
                    this.x -= 100;
                break;
            case 'up':
                if (this.y !== -20)
                    this.y -= 80;
                break;
            case 'right':
                if (this.x !== 400)
                    this.x += 100;
                break;
            case 'down':
                if (this.y !== 380)
                    this.y += 80;
                break;
            default:
                console.log('Wrong key pressed');
                break;
        }
    }
}

const enemy1 = new Enemy(60, -100);
const enemy2 = new Enemy(140, -150);
const enemy3 = new Enemy(220, -200);
const enemy4 = new Enemy(60, -125);
const enemy5 = new Enemy(140, -95);
const enemy6 = new Enemy(220, -190);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
const player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
