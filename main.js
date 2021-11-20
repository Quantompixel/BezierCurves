// https://javascript.info/bezier-curve


function setup() {
    console.log("loaded");
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB, 360, 100, 100);

    let one = {
        x: 0 + innerWidth/2,
        y: 0 + 200
    };
    let two = {
        x: 50 + innerWidth/2,
        y: -30 + 200
    };
    let three = {
        x: 0 + innerWidth/2,
        y: -100 + 200
    };
    let four = {
        x: 70 + innerWidth/2,
        y: -100 + 200
    };
    let five = {
        x: 0 + innerWidth/2,
        y: -30 + 200
    };

    punkte = new Array(one, two, three, four, five);

    // threePointBezier(points);

    // console.log(drawCurvePoint(punkte,0.5));

    let smoothLinePoints = [];
    for (let t = 0; t < 1; t+=0.05) {
        smoothLinePoints.push(drawCurvePoint(punkte,t)[0]);
    }


    background(0, 0, 100)
    linesBetweenPoints(smoothLinePoints);

    punkte.forEach(point => {
        fill(0, 100, 100);

        ellipse(point.x, point.y, 7, 7);
    });
}

function animateBezier(points, t = 0) {
    if (t > 1) {
        return;
    }
    background(100, 0, 100)
    drawCurvePoint(points)

    setTimeout(() => {
        requestAnimationFrame(() => {
            animateBezier(points, t + 0.005);
        })
    }, 30);
}

/**
 * Draws one point in a bezier-curve.
 * @param {Array} points Array of points.
 * @param {int} t Relative number that tells where on line the points should be placed.
 * @returns 
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

function linesBetweenPoints(points) {
    if (points.length < 2) {
        return;
    }

    line(points[0].x, points[0].y, points[1].x, points[1].y)
    points.shift();
    linesBetweenPoints(points);
}


function threePointBezier(points) {
    points.forEach(point => {
        fill(255, 0, 0);

        ellipse(point.x, point.y, 7, 7);
    });

    const diff12 = {
        x: points[0].x - points[1].x,
        y: points[0].y - points[1].y
    };
    const diff23 = {
        x: points[1].x - points[2].x,
        y: points[1].y - points[2].y
    };
    for (let i = 0; i < 1; i += 0.05) {
        const controlPoint1 = {
            x: points[0].x - i * diff12.x,
            y: points[0].y - i * diff12.y
        };
        const controlPoint2 = {
            x: points[1].x - i * diff23.x,
            y: points[1].y - i * diff23.y
        };
        fill(Math.floor(Math.random() * 255));
        line(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y);
    }
}

/**
 * Generates a random HSB-Color with 100% brightness and saturation.
 * @returns 
 */
function generateRandomHSBColor() {
    return {
        h: Math.floor(Math.random() * 360),
        b: 100,
        s: 100
    }
}