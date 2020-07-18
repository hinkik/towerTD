class Vec2 {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
        this.active = false
        this.hover = false
    }

    norm() {
        const length = Math.sqrt(this.length2())
        return new Vec2(this.x / length, this.y / length)
    }

    length2() {
        return this.dot(this)
    }

    dot(rhs) {
        return this.x * rhs.x + this.y * rhs.y
    }

    add(rhs) {
        return new Vec2(this.x + rhs.x, this.y + rhs.y)
    }
    subt(rhs)  {
        return new Vec2(this.x - rhs.x, this.y - rhs.y)
    }
    scale(c)  {
        return new Vec2(this.x * c, this.y * c)
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', () => {
            reject("Image not found");
        });
        image.src = url;
    });
}

function decasteljau(P1, P2, P3, P4, t) {
    const P12 = P1.scale(1 - t).add(P2.scale(t));
    const P23 = P2.scale(1 - t).add(P3.scale(t));
    const P34 = P3.scale(1 - t).add(P4.scale(t));
    const P1223 = P12.scale(1 - t).add(P23.scale(t));
    const P2334 = P23.scale(1 - t).add(P34.scale(t));
    return P1223.scale(1 - t).add(P2334.scale(t));
}

function createBezier(pointsarr) {
    const nCurves = Math.floor(pointsarr.length / 3);
    const points = pointsarr
    return (t) => {
        if (t >= nCurves) {
            return points[points.length - 1];
        }
        const sP = Math.floor(t) * 3;
        return decasteljau(points[sP], points[sP + 1], points[sP + 2], points[sP + 3], t - Math.floor(t));
    };
}

function dCircle(context, pos, radius) {
    context.beginPath();
    context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    context.fill();
}

function dLine(context, p1, p2) {
    context.beginPath()
    context.moveTo(p1.x, p1.y)
    context.lineTo(p2.x, p2.y)
    context.stroke()
}

async function main(canvas) {
    const context = canvas.getContext('2d')
    const outputField = document.getElementById("output")
    const btn = document.getElementById("btn")
    const opacitySlider = document.getElementById("opacity")
    const bgImage = await loadImage("./level1.png")

    const state = {
        holding: false,
        heldobj: null,
        showpoints: true,
        opacity: 100
    }

    const points = [
        new Vec2(0, 0),
        new Vec2(500, 50),
        new Vec2(300, 400),
        new Vec2(200, 10)
    ]

    const draw = (context) => {
        context.clearRect(0, 0, 700, 520)
        context.globalAlpha = state.opacity
        context.drawImage(bgImage, 0, 0)
        context.globalAlpha = 1
        const bezier = createBezier(points)
        let lastpoint = bezier(0)
        const subdivisions = 50 * Math.floor(points.length / 3)
        for (let i = 1; i < subdivisions; i++) {
            const t = i / (subdivisions - 10) * Math.floor(points.length / 3)
            const nextpoint = bezier(t)
            dLine(context, lastpoint, nextpoint)
            lastpoint = nextpoint
        }
        if (state.showpoints) {
            points.forEach(point => {
                context.fillStyle = point.active ? "red" : "blue"
                dCircle(context, point, 3)
            })
        }
    }

    draw(context)
    document.addEventListener('mousemove', (e) => {
        if (state.holding) {
            requestAnimationFrame(() => {
                state.heldobj.x = e.clientX
                state.heldobj.y = e.clientY
                draw(context)
            })
        }
    })
    document.addEventListener('mousedown', (e) => {
        if (!state.holding) {
            let mindist2 = 2000
            points.forEach(point => {
                const dist2 = point.subt(new Vec2(e.clientX, e.clientY)).length2()
                if (dist2 < mindist2) {
                    state.holding = true
                    state.heldobj = point
                    mindist2 = dist2
                }
            })
            points.forEach(point => {point.active = false})
            if (state.heldobj) {
                state.heldobj.active = true
            }
            
        }
    })
    document.addEventListener('mouseup', (e) => {
        state.holding = false
        draw(context)
    })
    document.addEventListener('dblclick', (e) => {
        const to = new Vec2(e.clientX, e.clientY)
        const from = points[points.length - 1]
        const dir = to.subt(from)
        const len = Math.sqrt(dir.length2())
        const unitvec = dir.scale(1 / len)
        points.push(from.add(unitvec.scale(1 / 3 * len)))
        points.push(from.add(unitvec.scale(2 / 3 * len)))
        points.push(to)
        draw(context)
    })

    document.addEventListener('keypress', e =>{
        if (e.keyCode === 32) {
            state.showpoints = state.showpoints ? false : true
            draw(context)
        }
    })

    opacitySlider.addEventListener("change", e => {
        state.opacity = opacitySlider.value / 100
        draw(context)
    })

    btn.addEventListener("click", e => {
        const out = points.map(point => [point.x, point.y])
        outputField.innerHTML = JSON.stringify(out, false, 2)
    })
}

const canvas = document.getElementById('canvas')
main(canvas)