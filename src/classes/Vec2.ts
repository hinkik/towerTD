export default class Vec2 {
    x: number
    y: number
    constructor(x?: number, y?: number) {
        this.x = x || 0
        this.y = y || 0
    }

    norm(): Vec2 {
        const length = Math.sqrt(this.length2())
        return new Vec2(this.x / length, this.y / length)
    }

    length2(): number {
        return this.dot(this)
    }

    dot(rhs: Vec2): number {
        return this.x * rhs.x + this.y * rhs.y
    }

    add(rhs: Vec2): Vec2 {
        return new Vec2(this.x + rhs.x, this.y + rhs.y)
    }
    subt(rhs: Vec2): Vec2  {
        return new Vec2(this.x - rhs.x, this.y - rhs.y)
    }
    scale(c: number): Vec2  {
        return new Vec2(this.x * c, this.y * c)
    }
}