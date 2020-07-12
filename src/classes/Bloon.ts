import Entity from './Entity.js'
import Vec2 from './Vec2.js'
import { dCircle } from '../utils/canvasMethods.js'
import Level from './Level.js'

export default class Bloon extends Entity {
    constructor(pos: Vec2) {
        super(pos)
    }

    draw (context: CanvasRenderingContext2D) {
        if (this.deathTimer < 1) {
            const clr = 1 - this.deathTimer / 1
            context.strokeStyle = `rgba(0, 0, 0, ${clr})`
            dCircle(context!, this.pos, 10) 
        }
    }

    update(dT: number, level?: Level) {
        this.pos = this.pos.add(this.vel.scale(dT))
        this.vel = this.vel.add(new Vec2(0, 1))
        this.lifeTime += dT

        if (this.lifeTime > 2) {
            this.dead = true
            this.deathTimer += dT
        }
    }
}