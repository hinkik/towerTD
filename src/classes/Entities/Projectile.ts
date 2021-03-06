import Entity from '../Entity.js'
import Vec2 from '../Vec2.js'
import Level from '../Level.js'
import { dCircle } from '../../utils/canvasMethods.js'

export default class Projectile extends Entity {
    maxLifeTime: number = 10
    constructor(pos: Vec2, vel: Vec2) {
        super(pos, 5)
        this.vel = vel
    }

    onUpdate(dT: number, level: Level) {
        if (!this.dead) {
            for (const bloon of level.bloons) {
                const dist2 = bloon.pos.subt(this.pos).length2()
                if (dist2 < Math.pow(this.collisionRadius + bloon.collisionRadius, 2)) {
                    bloon.onCollision(bloon, this)
                    this.vel = new Vec2()
                    this.dead = true
                    break
                }
            }
            this.pos = this.pos.add(this.vel.scale(dT))
        }
        
        if (this.lifeTime > this.maxLifeTime) {
            this.dead = true
        }
        if (this.dead) {
            this.deathTimer += dT
        }
    }

    draw(context: CanvasRenderingContext2D) {
        if (!this.dead) {
            context.fillStyle = `
                rgba(${0}, ${0}, ${0}, ${1})
            `
            dCircle(context!, this.pos, this.collisionRadius) 
        }
        
    }
}