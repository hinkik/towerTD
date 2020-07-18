import { beginLoopAt } from './utils/timing.js'
import Vec2 from './classes/Vec2.js'
import Bloon from './classes/Entities/Bloon.js'
import Level from './classes/Level.js'
import { createApe } from './towers/ape.js'
import { createLinearBezier } from './utils/bezier.js'
import { loadImage } from './utils/loaders.js'

interface ILeveldata {
    points: Array<number[]>
    bgImage?: string | null
}

function createBlueBloon() {
    const bloon = new Bloon()
    bloon.speed = 100
    bloon.color = {r: 0, g: 0, b: 255}
    return bloon
}
function createRedBloon() {
    const bloon = new Bloon()
    bloon.speed = 70
    bloon.color = {r: 255, g: 0, b: 0}
    return bloon
}

async function loadLevel(url: string): Promise<Level> {
    const level = new Level()
    const leveldata: ILeveldata = await fetch(url).then(r => r.json())
    try {
        const bgImage = await loadImage(`../img/levels/${leveldata.bgImage}`)
        level.onDraw = (context: CanvasRenderingContext2D) => context.drawImage(bgImage, 0, 0)
    } catch (err) { console.log(err) }

    level.getPos = createLinearBezier(leveldata.points, 1000, 5)
    return level
}

async function main(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    const level = await loadLevel("../leveldata/level1.json")
    const ape = createApe(new Vec2(270, 190))
    level.towers.push(ape)
    const update = (dT: number) => {
        level.lifeTime+=dT
        level.update(dT)
        level.draw(context!)

        if (level.lifeTime > 1) {
            if (Math.random() > 0.8) {
                level.bloons.push(createBlueBloon())
            } else {
                level.bloons.push(createRedBloon())
            }
            level.lifeTime = 0
            
        }
        return 0
    }
    beginLoopAt(1 / 60, update)

    document.addEventListener("keypress", e => {
        switch(e.keyCode) {
            case 97:
                ape.upgrade(0)
                break
            case 115:
                ape.upgrade(1)
                break
        }
    })
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
main(canvas)