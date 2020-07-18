import Upgrade from "../classes/Upgrade.js";

export function accuracy(id: number, factor: number) {
    const upgrade = new Upgrade(id)
    upgrade.effect = (tower: any) => {
        tower.range *= factor
    }
    return upgrade
}