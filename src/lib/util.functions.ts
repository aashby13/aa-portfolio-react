export const toTimecode = (timeInSeconds: number): string => {
    let s1, s2;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - (minutes * 60));
    if (seconds < 10) {
        s1 = '0';
        s2 = seconds;
    } else {
        s1 = seconds.toString().charAt(0);
        s2 = seconds.toString().charAt(1);
    }
    return `${minutes}:${s1}${s2}`;
}