import Vec2 from '../classes/Vec2.js'

class Entity {
    pos: Vec2
    vel: Vec2
    constructor() {
        this.pos = new Vec2()
        this.vel = new Vec2()
    }

    update(dT: number) {

    }

    draw(context: CanvasRenderingContext2D) {
        
    }
}

export default Entity