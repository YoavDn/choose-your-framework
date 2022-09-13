// import './style.css'
import { playerStand } from './ts/character'
import { Sprite, Player } from './ts/classes'
import { portals, } from './ts/portals'

const bgImage = new Image()
bgImage.src = "/src/assets/game-map.png"

const canvas = document.getElementById('canvas') as HTMLCanvasElement
export const c = canvas.getContext('2d')


canvas.width = window.innerWidth > 600 ? 960 : 360
canvas.height = window.innerWidth > 600 ? 680 : 480

c!.fillStyle = 'white'
c?.fillRect(0, 0, canvas.width, canvas.height)



const background = new Sprite({ x: -100, y: -520 }, bgImage)
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
        return window.innerWidth > 600 ? portal.position.x > 430 && portal.position.x < 500
            : portal.position.x > 130 && portal.position.x < 200
    })) {
        const currPortal = portals.find(portal => {
            return window.innerWidth > 600
                ? portal.position.x > 430 && portal.position.x < 500
                : portal.position.x > 130 && portal.position.x < 200
        })
        if (keys.up) openPopup(currPortal!.title)
    }

    /// borders logic
    if (background.position.x < 0 && background.position.x > (window.innerWidth > 600 ? -1900 : -2400)) {
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
    // console.log(portals[0].position.x);

}
animate()




document.addEventListener('keydown', (e) => {
    // console.log(e.key);

    switch (e.key) {
        case 'ArrowLeft':
            move('left')
            break
        case "ArrowRight":
            move('right')
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
            stop('left')
            break
        case "ArrowRight":
            stop('right')
            break
        case "ArrowUp":
            keys.up = false
        case "Space":
            keys.space = false

    }
})

const leftBtn = document.querySelector<HTMLButtonElement>('.left-btn')
const rightBtn = document.querySelector<HTMLButtonElement>('.right-btn')
const upBtn = document.querySelector<HTMLButtonElement>('.up-btn')
leftBtn!.addEventListener('touchstart', () => move('left'))
rightBtn!.addEventListener('touchstart', () => move('right'))
rightBtn!.addEventListener('touchend', () => stop('right'))
leftBtn!.addEventListener('touchend', () => stop('left'))
upBtn!.addEventListener('touchstart', () => keys.up = true)
upBtn!.addEventListener('touchend', () => keys.up = false)




function move(dir: "left" | 'right') {
    dir === 'left' ? keys.left = true : keys.right = true
    player.isMoving = true
    player.image = dir === 'left' ? player.sprites.walkLeft : player.sprites.walk
}
function stop(dir: 'left' | 'right') {
    player.isMoving = false
    dir === 'left' ? keys.left = false : keys.right = false
    player.image = dir === 'left' ? player.sprites.standLeft : player.sprites.stand
}



function openPopup(title: string) {
    const popupEl = document.querySelector('.popup') as HTMLDivElement
    document.querySelector<HTMLSpanElement>('.span-title')!.innerText = title
    document.querySelector<HTMLImageElement>('.popup-img')!.src = `./src/assets/framework-imgs/${title.toLowerCase()}js.png`
    document.querySelector<HTMLButtonElement>('.to-website-btn')!.style.backgroundColor = `var(--${title.toLowerCase()}-clr)`
    document.querySelector<HTMLParagraphElement>('.popup-desc')!.innerText = popupDesc(title)
    popupEl.classList.remove('hidden')
}



document.querySelector('.cancel-btn')?.addEventListener('click', () => {
    const popupEl = document.querySelector('.popup') as HTMLDivElement
    popupEl.classList.add('hidden')
})

document.querySelector<HTMLButtonElement>('.to-website-btn')?.addEventListener('click', () => {
    const framework = document.querySelector<HTMLSpanElement>('.span-title')!.innerText
    document.querySelector('.popup')?.classList.add('hidden')

    switch (framework) {
        case 'React':
            window.open('https://reactjs.org/')
            break
        case 'Vue':
            window.open('https://vuejs.org')
            break
        case 'Svelte':
            window.open('https://svelte.dev')
            break
        case 'Solid':
            window.open('https://www.solidjs.com')
            break
        case 'Angular':
            window.open('https://angular.io')
    }
})

function popupDesc(title: string): string {
    if (title === 'React') return 'A JavaScript library for building user interfaces'
    else if (title === 'Vue') return 'The Progressive JavaScript Framework'
    else if (title === 'Svelte') return 'CYBERNETICALLY ENHANCED WEB APPS'
    else if (title === 'Solid') return 'Simple and performant reactivity for building user interfaces.'
    else if (title === 'Angular') return "The modern web developer's platform"
    else return ''
}

document.querySelector('.help-btn')?.addEventListener('click', () => {
    document.querySelector('.help-popup')?.classList.toggle('hidden')
})

document.querySelector('.help-popup button')?.addEventListener('click', () => {
    document.querySelector('.help-popup')?.classList.add('hidden')
})