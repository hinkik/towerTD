import { beginLoopAt } from './utils/timing.js'
import Vec2 from './classes/Vec2.js'
import Entity from './classes/Entity.js'
import Bloon from './classes/Bloon.js'
import { loadImage } from './utils/loaders.js'
import { dCircle } from './utils/canvasMethods.js'
import Level from './classes/Level.js'

class Ape extends Entity{
    constructor(pos: Vec2) {
        super(pos)
    }

    draw(context: CanvasRenderingContext2D) {
        dCircle(context, this.pos, 10)
    }

    update (dT: number, level: Level) {
        
    }
}

async function main(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    const texture = await loadImage("../img/image.png") as HTMLImageElement
    const level = new Level()
    
    const ape: Entity = new Ape(new Vec2(300, 150))

    level.entities.push(ape)

    const update = (dT: number) => {
        context!.fillStyle = "#f4f4f4"
        context!.fillRect(0, 0, canvas.width, canvas.height);
        context!.drawImage(texture, 10, 10)
        
        level.lifeTime+=dT
        level.update(dT)
        level.draw(context!)

        if (level.lifeTime > 1) {
            level.lifeTime = 0
            level.entities.push(new Bloon(new Vec2(200, -10)))
        }
        return 0
    }

    beginLoopAt(1 / 60, update)
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
main(canvas)