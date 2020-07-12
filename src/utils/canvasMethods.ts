import Vec2 from '../classes/Vec2.js'

export function dSphere(context: CanvasRenderingContext2D, pos: Vec2, radius: number) {
    context.beginPath()
    context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
    context.stroke()
}