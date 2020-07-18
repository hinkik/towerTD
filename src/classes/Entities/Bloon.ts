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
    maxLifeTime: number = 1000
    speed: number = 100
    dist: number = 0
    constructor() {
        super(new Vec2(), 10)
    }

    onCollision(us: Entity, them: Entity) {
        this.dead = true
    }

    draw (context: CanvasRenderingContext2D) {
        const alpha = 1 - this.deathTimer / this.removeAfter
        context.fillStyle = `
            rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})
        `
        dCircle(context!, this.pos, this.collisionRadius) 
    }

    onUpdate(dT: number, level: Level) {
        if (this.dead) {
            this.deathTimer += dT
        } else {
            const prevPos = this.pos
            this.pos = level.getPos(this.dist)
            this.dist += this.speed * dT 
            this.vel = this.pos.subt(prevPos).scale(1 / dT)
            if (this.lifeTime > this.maxLifeTime) {
                this.dead = true
            }
        }
    }
}