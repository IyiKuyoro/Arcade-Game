class Enemy {
    //Creates the bug object
    constructor(yPosition, xPosition) {
        // Sets the initial speed to the bugs
        // Sets the initial position of the bug
        // Sets the bug image
        this.speed = Math.ceil((Math.random() * 4) + 2);
        this.x = xPosition;
        this.y = yPosition;
        this.sprite = 'images/enemy-bug.png';
    }

    // Changes the position of the bug
    update() {
        if (this.x > 505) {
            // Changes the speed of the object and resets it to the right of the screen
            this.x = -100;
            this.speed = Math.ceil((Math.random() * 4) + 2);
        }
        this.x += this.speed;
    }

    // Re-renders the bug to its new position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    // Creates a new Player object
    constructor() {
        // Sets the initial score to 0
        // Sets the initial position of the player
        // Sets the initial character
        this.score = 0;
        this.x = 200;
        this.y = 380;
        this.sprite = 'images/char-boy.png';
    }

    // Checks for a collusion or a win
    update() {
        // If the player and the enters the water reset player.
        if (this.y <= -20) {
            this.y = 380;
            this.x = 200;
            this.score += 1;
            rock.resetPos(); // Resets the position of the rock
            gem = new Gem('gem', 'images/Gem Orange.png');
        }

        //reset the player and clear score
        const reset = () => {
            this.y = 380;
            this.score = 0;
            gem = new Gem('gem', 'images/Gem Orange.png'); // Creates a new gem
        }

        //If player collides with bug, reset player
        if ((this.x <= allEnemies[0].x + 50 && this.x >= allEnemies[0].x - 50) && this.y === allEnemies[0].y) {
            reset();
        } else if ((this.x <= allEnemies[1].x + 50 && this.x >= allEnemies[1].x - 50) && this.y === allEnemies[1].y) {
            reset();
        } else if ((this.x <= allEnemies[2].x + 50 && this.x >= allEnemies[2].x - 50) && this.y === allEnemies[2].y) {
            reset();
        } else if ((this.x <= allEnemies[3].x + 50 && this.x >= allEnemies[3].x - 50) && this.y === allEnemies[3].y) {
            reset();
        } else if ((this.x <= allEnemies[4].x + 50 && this.x >= allEnemies[4].x - 50) && this.y === allEnemies[4].y) {
            reset();
        } else if ((this.x <= allEnemies[5].x + 50 && this.x >= allEnemies[5].x - 50) && this.y === allEnemies[5].y) {
            reset();
        }
    }

    // Changes the position of the player
    // Adjusts the score
    render() {
        document.getElementById('score').innerText = this.score;
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handles the keyup event
    handleInput(key) {
        const playerSprites = [
            'images/char-boy.png',
            'images/char-horn-girl.png',
            'images/char-cat-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
        ]; // Holds all the character images

        switch (key) {
            case 'space':
                // Changes the character
                let newSprite = 'images/char-boy.png';
                do {
                    newSprite = playerSprites[Math.floor(Math.random() * 5)];
                } while (newSprite === this.sprite);
                this.sprite = newSprite;
                break;
            case 'left':
                // Moves the character left
                if (rock.x === player.x - 100 && rock.y === player.y) {
                    break;
                } else if (this.x !== 0) {
                    this.x -= 100;
                }
                break;
            case 'up':
                // Moves the character up
                if (rock.x === player.x && rock.y === player.y - 80) {
                    break;
                } else if (this.y !== -20)
                    this.y -= 80;
                break;
            case 'right':
                // Moves the character right
                if (rock.x === player.x + 100 && rock.y === player.y) {
                    break;
                } else if (this.x !== 400)
                    this.x += 100;
                break;
            case 'down':
                // Moves the character down
                if (rock.x === player.x && rock.y === player.y + 80) {
                    break;
                } else if (this.y !== 380)
                    this.y += 80;
                break;
            default:
                console.log('Wrong key pressed');
                break;
        }
    }
}

class Obstacle {
    // Creates an obstacle
    constructor(type) {
        this.resetPos();
        this.type = type;
    }

    // Renders the obstacle
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    resetPos() {
        // Sets the position of the obstacles
        const yPos = [60, 140, 220];
        const xPos = [0, 100, 200, 300, 400];
        this.x = xPos[Math.floor(Math.random() * 5)];
        this.y = yPos[Math.floor(Math.random() * 3)];
    }
}

class Gem extends Obstacle {
    // Creates a gem object which inherits from obstacle
    constructor(type, sprite) {
        super(type);
        this.sprite = sprite;
    }

    // Increase the score by 10 when player collides with object and
    // Removes the gem.
    update() {
        if (player.x === this.x && player.y === this.y) {
            this.x = -200;
            player.score += 10;
        }
    }
}

class Rock extends Obstacle {
    // Creates the rock object
    constructor(type, sprite) {
        super(type);
        this.sprite = sprite;

        while(this.x === gem.x && this.y === gem.y) {
            super(type);
        }
    }
}

// Initialize all the characters
const enemy1 = new Enemy(60, -100);
const enemy2 = new Enemy(140, -150);
const enemy3 = new Enemy(220, -140);
const enemy4 = new Enemy(60, -125);
const enemy5 = new Enemy(140, -100);
const enemy6 = new Enemy(220, -190);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
let gem = new Gem('gem', 'images/Gem Orange.png');
const player = new Player();
const rock = new Rock('rock', 'images/Rock.png')

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
