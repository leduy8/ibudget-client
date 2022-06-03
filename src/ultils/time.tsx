export function delay(time) {
    /**
     * time: miliseconds
     */
    return new Promise(resolve => setTimeout(resolve, time));
}