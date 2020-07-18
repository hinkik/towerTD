import Upgrade from "../classes/Upgrade.js";

export function speed(id: number, factor: number) {
    const upgrade = new Upgrade(id)
    upgrade.effect = (tower: any) => {
        tower.cooldown *= factor
    }
    return upgrade
}