// https://javascript.info/bezier-curve

function setup() {
    console.log("loaded");
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB, 360, 100, 100);

    let one = {
        x: 0,
        y: 100
    };
    let two = {
        x: 50,
        y: 100
    };
    let three = {
        x: 50,
        y: 0
    };
    let four = {
        x: 100,
        y: 0
    };

    punkte = new Array(one, two, three, four);

    let smoothLinePoints = [];
    for (let t = 0; t <= 1; t+=0.01) {
        smoothLinePoints.push(drawCurvePoint(punkte,t)[0]);
    }

    background(0, 0, 100)
    linesBetweenPoints(smoothLinePoints);

    stroke(0);
    strokeWeight(0.5);
    punkte.forEach(point => {
        fill(0, 100, 100);

        ellipse(point.x, point.y, 3, 3);
    });
}

/**
 * Draws one point in a bezier-curve.
 * @param {Array} points Array of points
 * @param {int} t Relative number that tells where on line the points should be placed
 * @returns The one point that lies on the bezier curve at the position t.
 */
function drawCurvePoint(pointArray, t) {
    const color = generateRandomHSBColor();
    fill(color.h, color.s, color.b);

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

        ellipse(base.x - diff.x * t, base.y - diff.y * t, 4, 4);
    }

    stroke(color.h, color.s, color.b);
    linesBetweenPoints(points);

    // recursion
    return drawCurvePoint(newPoints, t);
    // added return before the recursive statement
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