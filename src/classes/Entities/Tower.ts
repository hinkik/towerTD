import Entity from '../Entity.js'
import Vec2 from '../Vec2.js'
import { dCircle } from '../../utils/canvasMethods.js'
import Level from '../Level.js'
import Projectile from './Projectile.js'
import Upgrade from '../Upgrade.js'

export default class Tower extends Entity{
    cooldownTime: number = 0
    cooldown: number = 1
    bulletSpeed: number = 600
    range: number = 200
    ugradeables: Map<number, Upgrade> = new Map()
    upgrades: Set<number> = new Set()
    constructor(pos: Vec2) {
        super(pos, 10)
    }

    upgrade(id: number) {
        const upgrade = this.ugradeables.get(id)
        if (upgrade) {
            upgrade.effect(this)
            this.upgrades.add(id)
        }
    }

    addUpgradeable(upgrade: Upgrade) {
        this.ugradeables.set(upgrade.id, upgrade)
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

    shoot(level: Level) {
        const target = getNearestEnemy(this, level.bloons)
        if (target) {
            const vel = targetPrediction(
                target.pos.subt(this.pos), target.vel, this.bulletSpeed
                )
                .norm().scale(this.bulletSpeed)
            level.projectiles.push(new Projectile(this.pos, vel))
        }
    }
}

function getNearestEnemy(me: Tower, entities: Entity[]): Entity | null {
    let target: Entity | null = null
    let mindist: number = me.range * me.range
    for (const entity of entities) {
        if (entity === me) { continue }
        const dist2 = entity.pos.subt(me.pos).length2()
        if (dist2 < mindist) {
            mindist = dist2
            target = entity
        }
    }
    return target
}

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