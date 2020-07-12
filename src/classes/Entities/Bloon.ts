import Entity from '../Entity.js'
import Vec2 from '../Vec2.js'
import { dCircle } from '../../utils/canvasMethods.js'
import Level from '../Level.js'

interface Color {
    r: number
    g: number
    b: number
    a?: number
}

export default class Bloon extends Entity {
    color: Color = { r: 255, g: 0, b: 0 }
    maxLifeTime: number = 10
    constructor(pos: Vec2) {
        super(pos, 10)
    }

    onCollision(us: Entity, them: Entity) {
        this.dead = true
    }

    draw (context: CanvasRenderingContext2D) {
        const alpha = 1 - this.deathTimer / this.removeAfter
        context.strokeStyle = `
            rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})
        `
        dCircle(context!, this.pos, this.collisionRadius) 
    }

    onUpdate(dT: number, level?: Level) {
        this.pos = this.pos.add(this.vel.scale(dT))
        this.vel = new Vec2(10, 100)
        if (this.lifeTime > this.maxLifeTime) {
            this.dead = true
        }
        if (this.dead) {
            this.deathTimer += dT
        }
    }
}