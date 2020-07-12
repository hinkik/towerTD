export function beginLoopAt(dT: number, update: (x: number) => number) {
    let accTime: number = 0
    let lastTime: number = 0
    let exit: boolean = false

    const updateProxy = (time: number) => {
        accTime += (time - lastTime) / 1000;

        if (accTime > 1) {
            accTime = 1;
        }
        
        while (accTime > dT) {
            if (update(dT) !== 0) { exit = true }
            accTime -= dT;
        }
        lastTime = time;

        if (!exit) { enqueue() }
        
    }
    const enqueue = (): void => {
        requestAnimationFrame(updateProxy)
    }
    enqueue()
}