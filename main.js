// https://javascript.info/bezier-curve

function setup() {
    console.log("loaded");

    createCanvas(innerWidth, innerHeight);
    colorMode(HSB, 360, 100, 100);

    const curve = new bezierCurve(6, generateRandomHSBColor());
}

/**
 * @constructor
 * @param anchorPointCount Number of points that the bezier curve is constructed of. 
 * @param color Color of the curve.
 */
class bezierCurve {
    constructor(anchorPointCount, color) {
        this.color = color;
        this.pointArray = [];

        for (let i = 0; i < anchorPointCount; i++) {
            let x = Math.floor(Math.random() * innerWidth);
            let y = Math.floor(Math.random() * innerHeight);

            this.pointArray.push(new anchorPoint(x, y, i))
        }

        this.draw()
    }

    draw() {
        let smoothLinePoints = [];
        for (let t = 0; t <= 1; t += 0.01) {
            smoothLinePoints.push(drawCurvePoint(this.pointArray, t)[0]);
        }
        stroke(this.color.h, this.color.s, this.color.b);
        linesBetweenPoints(smoothLinePoints);
    }
}

class anchorPoint {
    constructor(x, y, num) {
        this.x = x;
        this.y = y;
        this.num = num;

        this.draw();
    }

    draw() {
        stroke(0);
        strokeWeight(0.5);

        fill(0)
        textSize(5);
        textWidth(3);
        text(this.num, this.x + 3, this.y + 3);
        fill(0, 100, 100);
        ellipse(this.x, this.y, 3, 3);
    }
}

/**
 * Draws one point in a bezier-curve.
 * @param {Array} points Array of points
 * @param {int} t Relative number that tells where on line the points should be placed
 * @returns The one point that lies on the bezier curve at the position t.
 */
function drawCurvePoint(pointArray, t) {
    // Creates a clone of the parameter that is not referenced to the original one.
    let points = pointArray.slice(0);

    if (points.length <= 1) {
        return points;
    }

    const newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const diff = {
            x: points[i].x - points[i + 1].x,
            y: points[i].y - points[i + 1].y
        };
        const base = {
            x: points[i].x,
            y: points[i].y
        };

        newPoints.push({
            x: base.x - diff.x * t,
            y: base.y - diff.y * t
        });
    }

    // recursion
    return drawCurvePoint(newPoints, t);
    // https://stackoverflow.com/questions/21178455/simple-function-returning-undefined-value
}

/**
 * Connects points in an array with lines
 * @param {Array} points Array of points
 */
function linesBetweenPoints(points) {
    if (points.length < 2) {
        return;
    }

    line(points[0].x, points[0].y, points[1].x, points[1].y)
    points.shift();
    linesBetweenPoints(points);
}

/**
 * Generates a random HSB-Color with 100% brightness and saturation.
 * @returns Random color
 */
function generateRandomHSBColor() {
    return {
        h: Math.floor(Math.random() * 360),
        b: 100,
        s: 100
    }
}