// Create canvas and canvas context variables
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Resize the width and height of the canvas
canvas.width = 1024;
canvas.height = 576;

// Fill the canvas (arguments provided are: x-position, y-position, fill width and fill height)
c.fillRect(0, 0, canvas.width, canvas.height);

// Create gravity constant
const gravity = 0.7;

// Create the sprite class which takes arguments for the player/enemy
class Sprite {
    constructor({ position, velocity }) {
        this.position = position,
        this.velocity = velocity,
        this.height = 150,
        this.lastKey
    }

    // Method for sprite to fill the player/enemy sprite
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    // Method to begin moving sprites
    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // If player and enemy are touching the floor, set velocity = 0, else, increment velocity with gravity until the sprites reach the floor
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

// Create player and enemy sprite
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
});

console.log(player);

// Create constant which monitors for when keys are pressed
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


// Create animation loop
function animate() {
    // This asks us what function we want to loop over and over again
    window.requestAnimationFrame(animate)
    // Reset the canvas fillstyle and clear the canvas
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // Draws the sprites and updates animations
    player.update()
    enemy.update()

    // Reset player/enemy velocity
    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    // Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
}
// Call animation loop
animate()

// Add keypress event listeners
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player keys
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            console.log(player.position.y)
            break
        case 'w':
            if (player.position.y >= 420) {
                player.velocity.y = -20
            }
            break

        // Enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if (enemy.position.y >= 420)
            enemy.velocity.y = -20
            break
    }
    console.log(event.key)
});

// Add keyoff event listeners
window.addEventListener('keyup', (event) => {
    // Player keys
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    // Enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    console.log(event.key)
});

// Testing GIT Control