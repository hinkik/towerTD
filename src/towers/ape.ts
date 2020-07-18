import Vec2 from "../classes/Vec2.js"
import Tower from "../classes/Entities/Tower.js"
import { accuracy } from '../upgrades/accuracy.js'
import { speed } from '../upgrades/speed.js'

const upAccuracy = accuracy(0, 1.2)
const upSpeed = speed(1, 0.8)

export function createApe(pos: Vec2) {
    const ape = new Tower(pos)
    ape.addUpgradeable(upAccuracy)
    ape.addUpgradeable(upSpeed)
    ape.bulletSpeed = 1000
    ape.range = 150
    ape.cooldown = 1
    return ape
}