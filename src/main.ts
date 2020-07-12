import { beginLoopAt } from './utils/timing.js'
import Vec2 from './classes/Vec2.js'
import { dSphere } from './utils/canvasMethods.js'
import Entity from './classes/Entity.js'

function createBloon(pos: Vec2) {
    const bloon = new Entity()
    bloon.pos = pos
    
    bloon.update = (dT) => {
        bloon.pos = bloon.pos.add(bloon.vel.scale(dT))
        bloon.vel = bloon.vel.add(new Vec2(0, 1))
    }
    bloon.draw = (context: CanvasRenderingContext2D) => {
        dSphere(context!, bloon.pos, 10)
    }
    bloon.vel.x = (Math.random() - 0.50) * 100
    return bloon
}

function main(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d')

    const entities: Entity[] = []
    for (let i = 0; i < 10; i++) { entities.push(createBloon(new Vec2(200, 0))) }

    const update = (dT: number) => {
        context!.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(entity => {
            entity.update(dT)
            entity.draw(context!)
        })
        
        return 0
    }

    beginLoopAt(1 / 60, update)
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
main(canvas)