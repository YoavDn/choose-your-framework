import './style.css'

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 680
c!.fillStyle = 'white'
c?.fillRect(0, 0, canvas.width, canvas.height)

const bgImage = new Image()
bgImage.src = "./src/assets/game-map.png"

// player images
const playerWalk = new Image()
playerWalk.src = './src/assets/player-walk.png'

const playerWalkLeft = new Image()
playerWalkLeft.src = './src/assets/player-walk-left.png'

const playerStand = new Image()
playerStand.src = './src/assets/player-stand.png'

const playerStandLeft = new Image()
playerStandLeft.src = './src/assets/player-stand-left.png'


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

class Player {
    position: positionType
    isMoving: boolean
    image: HTMLImageElement
    frames: { max: number, val: number, elapsed: number }
    sprites: { walk: HTMLImageElement, stand: HTMLImageElement, walkLeft: HTMLImageElement, standLeft: HTMLImageElement }

    constructor(pos: positionType, image: HTMLImageElement, frames = { max: 1, val: 0, elapsed: 0 }) {
        this.position = pos
        this.image = image
        this.frames = frames
        this.isMoving = false
        this.sprites = {
            stand: playerStand,
            standLeft: playerStandLeft,
            walk: playerWalk,
            walkLeft: playerWalkLeft
        }
    }

    draw() {
        this.isMoving ? c!.drawImage(
            this.image,
            64 * this.frames.val,
            0,
            this.image.width / 6,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / 6,
            this.image.height
        ) : c!.drawImage(
            this.image,
            this.position.x,
            this.position.y
        )

        if (!this.isMoving) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}


const background = new Sprite({ x: -1000, y: -520 }, 'hi', bgImage)
const player = new Player(
    { x: (canvas.width / 2) - playerStand.width / 2, y: 375 },
    playerStand,
    { max: 5, val: 0, elapsed: 0 })

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


    /// borders logic
    if (background.position.x < 0 && background.position.x > -1900) {
        if (keys.left) background.position.x += 3
        else if (keys.right) background.position.x -= 3

    } else {
        if (player.position.x > canvas.width / 2 - player.sprites.stand.width / 2 &&
            !keys.left &&
            background.position.x > -500) {
            background.position.x -= 3
        } else if (player.position.x < canvas.width / 2 - player.sprites.stand.width / 2 &&
            !keys.right &&
            background.position.x < -1000) {
            background.position.x += 3
        }
        else if (keys.left && player.position.x > 0) player.position.x -= 3
        else if (keys.right && player.position.x < 900) player.position.x += 3
    }
    // console.log(keys);


}
animate()




document.addEventListener('keydown', (e) => {
    console.log(e.key);

    switch (e.key) {
        case 'ArrowLeft':
            keys.left = true
            player.isMoving = true
            player.image = player.sprites.walkLeft
            break
        case "ArrowRight":
            player.isMoving = true
            keys.right = true
            player.image = player.sprites.walk
            break
        case "UpArrow":
            keys.up = false
        case "DownArrow":
            keys.down = false
        case "Space":
            keys.space = false

    }
})

document.addEventListener('keyup', (e) => {
    console.log(e.key, 'hsit');
    switch (e.key) {
        case 'ArrowLeft':
            player.isMoving = false
            keys.left = false
            player.image = player.sprites.standLeft
            console.log('fuck');
            break
        case "ArrowRight":
            player.isMoving = false
            keys.right = false
            console.log('fuck');

            player.image = player.sprites.stand
            break
        case "UpArrow":
            keys.up = false
        case "DownArrow":
            keys.down = false
        case "Space":
            keys.space = false

    }
})