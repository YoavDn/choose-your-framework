import './style.css'
import { playerStand } from './ts/character'
import { Sprite, Player } from './ts/classes'
import { portals, } from './ts/portals'

export const canvas = document.getElementById('canvas') as HTMLCanvasElement

export const c = canvas.getContext('2d')
console.log(portals);

canvas.width = 960
canvas.height = 680
c!.fillStyle = 'white'
c?.fillRect(0, 0, canvas.width, canvas.height)

const bgImage = new Image()
bgImage.src = "./src/assets/game-map.png"


const background = new Sprite({ x: -100, y: -520 }, 'hi', bgImage)
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
    portals.forEach(portal => portal.draw())
    player.draw()

    //check if on portal 
    if (portals.some(portal => {
        return portal.position.x > 400 && portal.position.x < 464
    })) {
        console.log('on');
        const currPortal = portals.find(portal => portal.position.x > 400 && portal.position.x < 464)
        if (keys.up) openPopup(currPortal!.title)
    }

    /// borders logic
    if (background.position.x < 0 && background.position.x > -1900) {
        if (keys.left) {
            background.position.x += 3
            portals.forEach(portal => portal.position.x += 3)
        }
        else if (keys.right) {
            background.position.x -= 3
            portals.forEach(portal => portal.position.x -= 3)
        }

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
    // console.log(background.position.x);
    // console.log(portals[2].position.x);


}
animate()




document.addEventListener('keydown', (e) => {
    // console.log(e.key);

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
        case "ArrowUp":
            keys.up = true
        case "ArrowDown":
            keys.down = false
        case "Space":
            keys.space = false

    }
})

document.addEventListener('keyup', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'ArrowLeft':
            player.isMoving = false
            keys.left = false
            player.image = player.sprites.standLeft

            break
        case "ArrowRight":
            player.isMoving = false
            keys.right = false


            player.image = player.sprites.stand
            break
        case "ArrowUp":
            keys.up = false
        case "ArrowUp":
            keys.down = false
        case "Space":
            keys.space = false

    }
})


function openPopup(title: string) {
    const popupEl = document.querySelector('.popup') as HTMLDivElement
    // const spanTitleEl = document.querySelector('.span-title') as HTMLDivElement
    document.querySelector<HTMLSpanElement>('.span-title')!.innerText = title
    document.querySelector<HTMLImageElement>('.popup-img')!.src = `./src/assets/framework-imgs/${title.toLowerCase()}js.png`
    document.querySelector<HTMLButtonElement>('.to-website-btn')!.style.color = `var(--${title.toLowerCase()}-clr)`
    popupEl.classList.remove('hidden')
}



document.querySelector('.cancel-btn')?.addEventListener('click', (e) => {
    const popupEl = document.querySelector('.popup') as HTMLDivElement
    popupEl.classList.add('hidden')
})

document.querySelector<HTMLButtonElement>('.to-website-btn')?.addEventListener('click', (e) => {
    const framework = document.querySelector<HTMLSpanElement>('.span-title')!.innerText
    document.querySelector('.popup')?.classList.add('hidden')


    switch (framework) {
        case 'React':
            // window.open('google.com')
            console.log('react');
            break
        case 'Vue':
            console.log('vue');
            break
        case 'Svelte':
            console.log('svelte');
            break
        case 'Solid':
            console.log('solid');
            break
        case 'Angular':
            console.log('Angular');

    }
})