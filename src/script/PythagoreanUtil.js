export default function getDistance(x1,y1,x2,y2) {
    let distanceX = x2 - x1,
        distanceY = y2 - y1;
    return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
}
