class Enemy {
    constructor(yPosition, xPosition) {
        this.speed = Math.ceil((Math.random() * 2) + 2);
        this.x = xPosition;
        this.y = yPosition;
        this.sprite = 'images/enemy-bug.png';
    }

    update() {
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
        this.sprite = 'images/char-boy.png';
    }

    update() {
        // If the player and the enters the water reset player.
        if (this.y <= -20) {
            this.y = 380;
        }

        if ((this.x <= allEnemies[0].x + 50 && this.x >= allEnemies[0].x - 20) && this.y === allEnemies[0].y) {
            this.y = 380;
        } else if ((this.x <= allEnemies[1].x + 50 && this.x >= allEnemies[1].x - 20) && this.y === allEnemies[1].y) {
            this.y = 380;
        } else if ((this.x <= allEnemies[2].x + 50 && this.x >= allEnemies[2].x - 20) && this.y === allEnemies[2].y) {
            this.y = 380;
        } else if ((this.x <= allEnemies[3].x + 50 && this.x >= allEnemies[3].x - 20) && this.y === allEnemies[3].y) {
            this.y = 380;
        } else if ((this.x <= allEnemies[4].x + 50 && this.x >= allEnemies[4].x - 20) && this.y === allEnemies[4].y) {
            this.y = 380;
        } else if ((this.x <= allEnemies[5].x + 50 && this.x >= allEnemies[5].x - 20) && this.y === allEnemies[5].y) {
            this.y = 380;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        const playerSprites = [
            'images/char-boy.png',
            'images/char-horn-girl.png',
            'images/char-cat-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
        ];

        switch (key) {
            case 'space':
                let newSprite = 'images/char-boy.png';
                do {
                    newSprite = playerSprites[Math.floor(Math.random() * 5)];
                } while (newSprite === this.sprite);
                this.sprite = newSprite;
                break;
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
const enemy3 = new Enemy(220, -140);
const enemy4 = new Enemy(60, -125);
const enemy5 = new Enemy(140, -100);
const enemy6 = new Enemy(220, -190);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
const player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
