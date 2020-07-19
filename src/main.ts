import { beginLoopAt } from './utils/timing.js'
import Vec2 from './classes/Vec2.js'
import Bloon from './classes/Entities/Bloon.js'
import Level from './classes/Level.js'
import { createApe } from './towers/ape.js'
import { createLinearBezier } from './utils/bezier.js'
import { loadImage } from './utils/loaders.js'
import Component from './classes/Component.js'
import { createButton } from './components/button.js'

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

    // <UI>
    const bufferUI = document.createElement('canvas')
    const userInterface = new Component()
    const btn = createButton({
        label: "Upgrade 1",
        pos: new Vec2(10, 10),
        size: new Vec2(70, 30),
        onClick: () => {ape.upgrade(0)}
    })
    const btn2 = createButton({
        label: "Change",
        pos: new Vec2(10, 100),
        size: new Vec2(70, 30),
        onClick: () => {
            btn.setState({
                label: "Upgrade 2",
                onClick: () => {ape.upgrade(1)}
            })
        }
    })
    userInterface.add(btn2)
    userInterface.add(btn)
    userInterface.use(bufferUI.getContext('2d')!)
    // </UI>

    const update = (dT: number) => {
        level.lifeTime+=dT
        level.update(dT)
        level.draw(context!)

        context!.drawImage(bufferUI, 0, 0)

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

    document.addEventListener("click", e => {
        userInterface.click()
    })
    document.addEventListener("mousemove", e => {
        userInterface.mouseMove(getMousePos(canvas, e))
    })
    document.addEventListener("mousedown", e => {
        userInterface.down()
    })
    document.addEventListener("mouseup", e => {
        userInterface.up()
    })
}

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return new Vec2(
        (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    )
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
main(canvas)