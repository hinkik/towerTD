import Vec2 from "../classes/Vec2.js"

export default class Component {
    parent: Component | null = null
    components: Component[] = []
    isHovering: boolean = false
    isDown: boolean = false
    mousePos: Vec2 = new Vec2()
    isAbs: boolean =  false
    pos: Vec2 = new Vec2()
    size: Vec2 = new Vec2(800, 600)
    state: any = {}

    setState(state: any) {
        this.state = state
        this.draw()
    }

    get absPos(): Vec2 {
        return (!this.isAbs && this.parent) ? 
            this.pos.add(this.parent.absPos) : this.pos
    }

    isInside(): boolean {
        if (this.mousePos.x > this.absPos.x &&
            this.mousePos.y > this.absPos.y &&
            this.mousePos.x < this.absPos.x + this.size.x &&
            this.mousePos.y < this.absPos.y + this.size.y
            ) {
            return true
        }
        return false
    }

    onClick() {

    }

    mouseMove(pos: Vec2) {
        this.mousePos = pos
        const hovering = this.isInside()
        // XOR
        if (hovering ? !this.isHovering : this.isHovering) {
            this.isHovering = hovering
            this.draw()
        }
        this.components.forEach(component => {
            component.mouseMove(pos)
        })
    }

    down() {
        this.isDown = true
        this.components.forEach(component => {
            component.down()
        })
        this.draw()
    }

    up() {
        this.isDown = false
        this.components.forEach(component => {
            component.up()
        })
        this.draw()
    }

    click() {
        if (this.isHovering) {
            this.onClick()
            this.components.forEach(component => {
                component.click()
            })
        }
        this.draw()
    }

    add(component: Component) {
        this.components.push(component)
        component.parent = this
    }

    onDraw(context: CanvasRenderingContext2D) {
    }

    use(context: CanvasRenderingContext2D) {
        this.draw = () => {
            this.onDraw(context)
            this.components.forEach(component => {
                component.draw()
            })
        }
        this.components.forEach(component => {
            component.use(context)
        })
        this.draw()
    }

    draw() {

    }
}