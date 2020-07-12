import Entity from './Entity.js'

class Level {
    entities: Entity[] = []
    lifeTime: number = 0
    constructor() {

    }

    update(dT: number) {
        this.entities.forEach((entity, index) => {
            entity.update(dT, this)
        })
        this.entities.forEach((entity, index) => {
            if (entity.dead && entity.deathTimer > 5) {
                this.entities.splice(index, 1)
            }
        })
    }

    draw(context: CanvasRenderingContext2D) {
        this.entities.forEach(entity => {
            entity.draw(context)
        })
    }
}

export default Level