export function generateRandom() {
    return parseInt((Math.random() * 100000000).toString())
}

export function hasWindowScrolledHalf() {
    return window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight / 2;
}