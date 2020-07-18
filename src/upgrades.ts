import Entity from "./classes/Entity.js"

function accuracy_20(entity: Entity) {
    
}

export function upgradeFactory(id: number): (entity: Entity) => void {
    let upgrade = (entity: Entity) => {}
    switch (id) {
        case 0:
            upgrade = accuracy_20
            break;
    }
    return upgrade
}