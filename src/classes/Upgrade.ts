export default class Upgrade {
    id: number
    name: string = ""
    cost: number = 0
    required: number[] = []
    constructor(id: number) {
        this.id = id
    }

    effect(tower: any) {

    }
}