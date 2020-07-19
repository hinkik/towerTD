import Component from "../classes/Component.js"
import Vec2 from "../classes/Vec2.js"
import { colors, fontSizes, fonts } from "../style.js"
import { dText, formatTextAs } from '../utils/canvasMethods.js' 

interface IButtonProps {
    label: string,
    pos: Vec2,
    size: Vec2,
    onClick: () => void
}

export function createButton({ label, pos, size, onClick }: IButtonProps) {
    const btn = new Component()
    btn.pos = pos
    btn.size = size
    btn.state = { onClick, label }
    btn.onClick = () => btn.state.onClick()
    const textPos = () => (btn.absPos.add(size.scale(0.5)))
    btn.onDraw = (context: CanvasRenderingContext2D) => {
        if (btn.isHovering) {
            if (btn.isDown) {
                context.fillStyle = colors.primaryDown
            } else {
                context.fillStyle = colors.primaryHover
            }
        } else {
            context.fillStyle = colors.primary
        }
        context.fillRect(btn.absPos.x, btn.absPos.y, size.x, size.y)
        formatTextAs(context, fonts.regular, fontSizes.regular, colors.text)
        dText(context, btn.state.label, textPos())
    }
    return btn
}