import Entity from '../Entity.js'
import Vec2 from '../Vec2.js'
import { dCircle } from '../../utils/canvasMethods.js'
import Level from '../Level.js'
import Projectile from './Projectile.js'

function targetPrediction(P: Vec2, V: Vec2, speed: number): Vec2 {
    const a = speed * speed - V.dot(V)
    const b = P.dot(V)
    const c = P.dot(P)

    const d = b * b + a * c
    let t = 0
    if (d >= 0) {
        t = (b + Math.sqrt(d)) / a
        if (t < 0) {
            t = 0
        }
    }
    return P.add(V.scale(t))
}

export default class Ape extends Entity{
    cooldownTime: number = 0
    cooldown: number = 1
    bulletSpeed: number = 600
    range: number = Math.pow(200, 2)
    upgrades: Map<number, (x: Ape) => void> = new Map() 
    constructor(pos: Vec2) {
        super(pos, 10)
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `
                rgba(${0}, ${0}, ${0}, ${1})
            `
        dCircle(context, this.pos, this.collisionRadius)
    }

    onUpdate (dT: number, level: Level) {
        this.pos = this.pos.add(this.vel.scale(dT))
        if (this.cooldownTime > this.cooldown) {
            this.shoot(level)
            this.cooldownTime = 0

        }
        this.cooldownTime += dT
    }

    nearestEnemy(entities: Entity[]): Entity | null {
        let target: Entity | null = null
        let mindist: number = this.range
        for (const entity of entities) {
            if (entity === this) { continue }
            const dist2 = entity.pos.subt(this.pos).length2()
            if (dist2 < mindist) {
                mindist = dist2
                target = entity
            }
        }
        return target
    }

    shoot(level: Level) {
        const target = this.nearestEnemy(level.bloons)
        if (target) {
            const vel = targetPrediction(
                target.pos.subt(this.pos), target.vel, this.bulletSpeed
                )
                .norm().scale(this.bulletSpeed)
            level.projectiles.push(new Projectile(this.pos, vel))
        }
    }
}
