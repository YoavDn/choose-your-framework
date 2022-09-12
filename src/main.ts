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

playerImage.onload = () => {
    c!.drawImage(bgImage, -100, -520)
    c?.drawImage(playerImage, (canvas.width / 2) - playerImage.width, 375)
}

