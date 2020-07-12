import Vec2 from '../classes/Vec2.js'
import Level from './Level.js'

class Entity {
    pos: Vec2
    vel: Vec2 = new Vec2()
    lifeTime: number = 0
    deathTimer: number = 0
    removeAfter: number = 0.15
    dead: boolean = false
    collisionRadius: number
    
    constructor(pos: Vec2, collisionRadius: number) {
        this.pos = pos
        this.collisionRadius = collisionRadius
    }

    onCollision(us: Entity, them: Entity) {

    }

    onUpdate(dT: number, level?: Level) {

    }

    update(dT: number, level: Level) {
        this.onUpdate(dT, level)
        
        this.lifeTime += dT
    }

    draw(context: CanvasRenderingContext2D) {

    }
}

export default Entity