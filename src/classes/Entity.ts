import Vec2 from '../classes/Vec2.js'
import Level from './Level.js'

class Entity {
    pos: Vec2
    vel: Vec2 = new Vec2()
    lifeTime: number = 0
    dead: boolean = false
    deathTimer: number = 0
    
    constructor(pos: Vec2) {
        this.pos = pos
    }

    update(dT: number, level?: Level) {

    }

    draw(context: CanvasRenderingContext2D) {

    }
}

export default Entity