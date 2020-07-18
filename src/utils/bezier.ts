import Vec2 from "../classes/Vec2.js";

function decasteljau(P1: Vec2, P2: Vec2, P3: Vec2, P4: Vec2, t: number): Vec2 {
    const P12 = P1.scale(1 - t).add(P2.scale(t))
    const P23 = P2.scale(1 - t).add(P3.scale(t))
    const P34 = P3.scale(1 - t).add(P4.scale(t))
    const P1223 = P12.scale(1 - t).add(P23.scale(t))
    const P2334 = P23.scale(1 - t).add(P34.scale(t))
    return P1223.scale(1 - t).add(P2334.scale(t))
}

function createBezier(pointsarr: Array<number[]>) {
    const nCurves = Math.floor(pointsarr.length / 3)
    const points = pointsarr.map(p => new Vec2(p[0], p[1]))
    return (t: number): Vec2 => {
        if (t >= nCurves) {
            return points[points.length - 1]
        }
        const sP = Math.floor(t) * 3
        return decasteljau(
            points[sP    ],
            points[sP + 1],
            points[sP + 2],
            points[sP + 3],
            t - Math.floor(t)
        )
    }
}

export function createLinearBezier(points: Array<number[]>, samples: number, ds: number) {
    const spline = createBezier(points)
    const nCurves = Math.floor(points.length / 3)
    const segmentPoints = linearize(spline, nCurves, samples, ds)
    const nSegments = segmentPoints.length - 1
    return (d: number) => {
        const p = d / ds
        const index = Math.floor(p)
        if (index + 1 > nSegments) {
            return segmentPoints[nSegments]
        }
        const t = p - index
        return segmentPoints[index].scale(1 - t).add(segmentPoints[index + 1].scale(t))
    }
}

function linearize(
    spline: (t: number) => Vec2,
    nCurves: number,
    samples: number,
    ds: number
    ): Vec2[]
{
    const dt = nCurves / samples / ds

    let p0 = spline(0)
    let length = 0
    const segmentPoints: Vec2[] = [p0]
    for (let t = dt; t < nCurves; t+=dt) {
        let p1 = spline(t)
        length += Math.sqrt(p1.subt(p0).length2())
        if (length > ds) {
            length = 0
            segmentPoints.push(p0)
        }
        p0 = p1
    }
    return segmentPoints
}