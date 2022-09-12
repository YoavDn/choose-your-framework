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
        c!.drawImage(this.image, -100, -520)
    }
}

const background = new Sprite({ x: -100, y: -520 }, 'hi', bgImage)



function animate() {
    background.draw()
    window.requestAnimationFrame(animate)
    // console.log('animate');
    c?.drawImage(playerImage, (canvas.width / 2) - playerImage.width, 375)
}
animate()


const keys = {
    left: false,
    right: false,
    down: false,
    up: false,
    space: false
}

document.addEventListener('keydown', (e) => {
    // console.log(e.key);

    switch (e.key) {
        case 'ArrowLeft':
            console.log('left');
            keys.left = true
        case "ArrowRight":
            console.log('right');
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
            console.log('left');
            keys.left = false
        case "ArrowRight":
            console.log('right');
            keys.right = false
        case "UpArrow":
            keys.up = false
        case "DownArrow":
            keys.down = false
        case "Space":
            keys.space = false

    }
})