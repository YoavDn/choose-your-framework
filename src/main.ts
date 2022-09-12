import './style.css'

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 680
c!.fillStyle = 'white'
c?.fillRect(0, 0, canvas.width, canvas.height)

const bgImage = new Image()
bgImage.src = "./src/assets/game-map.png"
const playerImage = new Image()
playerImage.src = './src/assets/char.png'

type positionType = { x: number, y: number }

class Sprite {
    position: positionType;
    image: HTMLImageElement
    constructor(pos: positionType, velocity: any, image: HTMLImageElement) {
        this.position = pos
        this.image = image
    }

    draw() {
        c!.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({ x: -1000, y: -520 }, 'hi', bgImage)
const player = new Sprite({ x: (canvas.width / 2) - playerImage.width, y: 375 }, 'hi', playerImage)

const keys = {
    left: false,
    right: false,
    down: false,
    up: false,
    space: false
}



function animate() {
    background.draw()
    window.requestAnimationFrame(animate)
    // console.log('animate');
    // c?.drawImage(playerImage, (canvas.width / 2) - playerImage.width, 375)
    player.draw()

    if (background.position.x < 0 && background.position.x > -1900) {
        if (keys.left) background.position.x += 3
        else if (keys.right) background.position.x -= 3

    } else {
        if (player.position.x > canvas.width / 2 - player.image.width / 2 &&
            !keys.left &&
            background.position.x > -500) {
            background.position.x -= 3
        } else if (player.position.x < canvas.width / 2 - player.image.width / 2 &&
            !keys.right &&
            background.position.x < -1000) {
            background.position.x += 3
        }
        else if (keys.left && player.position.x > 0) player.position.x -= 3
        else if (keys.right && player.position.x < 900) player.position.x += 3
    }
    console.log(background.position.x);
    console.log(player.position.x, canvas.width / 2 - player.image.width / 2);

}
animate()




document.addEventListener('keydown', (e) => {
    // console.log(e.key);

    switch (e.key) {
        case 'ArrowLeft':
            keys.left = true
        case "ArrowRight":
            keys.right = true
        case "UpArrow":
            keys.up = true
        case "DownArrow":
            keys.down = true
        case "Space":
            keys.space = true

    }
})

document.addEventListener('keyup', (e) => {
    // console.log(e.key);
    switch (e.key) {
        case 'ArrowLeft':
            keys.left = false
        case "ArrowRight":
            keys.right = false
        case "UpArrow":
            keys.up = false
        case "DownArrow":
            keys.down = false
        case "Space":
            keys.space = false

    }
})