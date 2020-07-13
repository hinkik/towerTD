import { beginLoopAt } from './utils/timing.js'
import Vec2 from './classes/Vec2.js'
import Entity from './classes/Entity.js'
import Bloon from './classes/Entities/Bloon.js'
import Level from './classes/Level.js'
import Ape from './classes/Entities/Ape.js'
import { createLinearBezier } from './utils/bezier.js'

interface ILeveldata {
    points: Array<number[]>
}

async function loadLevel(url: string): Promise<Level> {
    const level = new Level()
    const leveldata: ILeveldata =
        await fetch(url).then(r => r.json())
    level.getPos = createLinearBezier(leveldata.points, 100, 10)
    return level
}

async function main(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    const level = await loadLevel("../leveldata/level1.json")
    const ape: Entity = new Ape(new Vec2(300, 150))
    level.towers.push(ape)
    const update = (dT: number) => {
        context!.fillStyle = "#f4f4f4"
        context!.fillRect(0, 0, canvas.width, canvas.height);
        
        level.lifeTime+=dT
        level.update(dT)
        level.draw(context!)

        if (level.lifeTime > 1.4) {
            level.lifeTime = 0
            level.bloons.push(new Bloon(new Vec2(200, -10)))
        }
        return 0
    }
    beginLoopAt(1 / 60, update)
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
main(canvas)