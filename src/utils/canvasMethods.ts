import Vec2 from '../classes/Vec2.js'

export function dCircle(context: CanvasRenderingContext2D, pos: Vec2, radius: number) {
    context.beginPath()
    context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
    context.fill()
}

export function formatTextAs(
    context: CanvasRenderingContext2D,
    font: string,
    fontSize: string,
    fontColor: string
) {
    context.fillStyle = fontColor
    context.font = fontSize + " " + font
    context.textAlign = "center"
    context.textBaseline = "middle"
}

export function dText(
    context: CanvasRenderingContext2D,
    text: string,
    pos: Vec2,
    ) {
    context.fillText(text, pos.x, pos.y)
}