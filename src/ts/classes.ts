import { playerWalk, playerWalkLeft, playerStand, playerStandLeft } from './character'
import { c } from '../main'
type positionType = { x: number, y: number }

export class Sprite {
    position: positionType;
    image: HTMLImageElement
    constructor(pos: positionType, image: HTMLImageElement) {
        this.position = pos
        this.image = image
    }

    draw() {
        c!.drawImage(this.image, this.position.x, this.position.y)
    }
}

export class Player {
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