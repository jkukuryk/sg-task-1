let screenWidth = 0;
let screenHeight = 0;

export function getScreenSize() {
    if (screenWidth * screenHeight === 0) {
        return refreshScreenSize();
    }
    return {
        width: screenWidth,
        height: screenHeight,
    };
}
export function refreshScreenSize() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const documentWidth = document.body.clientWidth;
    const documentHeight = document.body.clientHeight;

    screenWidth = Math.max(windowWidth, documentWidth);
    screenHeight = Math.max(windowHeight, documentHeight); //iOS Notch issue fix

    return { width: screenWidth, height: screenHeight };
}
export enum CanvasOrientation {
    HORIZONTAL = 'Horizontal',
    VERTICAL = 'Vertical',
}
export function getOrientation() {
    const { width, height } = getScreenSize();
    return width > height ? CanvasOrientation.HORIZONTAL : CanvasOrientation.VERTICAL;
}

export function getSizeByScreenWidth(value: number) {
    const valuePrc = value / 100;
    const edge = screenWidth;
    return valuePrc * edge;
}
export function getSizeByScreenHeight(value: number) {
    const valuePrc = value / 100;
    const edge = screenHeight;
    return valuePrc * edge;
}
