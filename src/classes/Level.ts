import Entity from './Entity.js'
import Bloon from './Entities/Bloon.js'
import Projectile from './Entities/Projectile.js'

class Level {
    towers: Entity[] = []
    bloons: Bloon[] = []
    projectiles: Projectile[] = []
    lifeTime: number = 0

    update(dT: number) {
        this.bloons.forEach((bloon) => {
            bloon.update(dT, this)
        })
        this.projectiles.forEach((projectile) => {
            projectile.update(dT, this)
        })
        this.towers.forEach((tower) => {
            tower.update(dT, this)
        })
        
        this.bloons.forEach((bloon, index) => {
            if (bloon.deathTimer > 5) {
                this.bloons.splice(index, 1)
            }
        })
        this.projectiles.forEach((projectile, index) => {
            if (projectile.deathTimer > 5) {
                this.projectiles.splice(index, 1)
            }
        })
    }

    draw(context: CanvasRenderingContext2D) {
        this.bloons.forEach((bloon) => {
            bloon.draw(context)
        })
        this.towers.forEach((tower) => {
            tower.draw(context)
        })
        this.projectiles.forEach((projectile) => {
            projectile.draw(context)
        })
    }
}

export default Level