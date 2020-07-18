export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image: HTMLImageElement = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', () => {
            reject("Image not found")
        })
        image.src = url;
    });
}

export function loadJSON(url: string) {
    return fetch(url).then(r => r.json())
}