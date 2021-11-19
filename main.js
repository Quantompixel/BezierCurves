// https://javascript.info/bezier-curve

function setup() {
    console.log("loaded");
    createCanvas(innerWidth, innerHeight);
    colorMode(HSB, 360, 100, 100);

    const points = [];
    points.push({
        x: 0 + 500,
        y: 0 + 300
    });
    points.push({
        x: 50 + 500,
        y: -30 + 300
    });
    points.push({
        x: 0 + 500,
        y: -100 + 300
    });
    points.push({
        x: 70 + 500,
        y: -150 + 300
    });
    points.push({
        x: 200 + 500,
        y: -80 + 300
    });

    points.forEach(point => {
        fill(0, 100, 100);

        ellipse(point.x, point.y, 7, 7);
    });


    drawCurvePoint(points, 0.75)
    // threePointBezier(points);
}

/**
 * 
 * @param {Array} points Array of points.
 * @param {int} t Relative number that tells where on line the points should be placed.
 * @returns 
 */
function drawCurvePoint(points, t) {
    noStroke()
    const color = generateRandomHSBColor();
    fill(color.h, color.s, color.b);

    if (points.length <= 1) return;

    //jjpoints = [];

    const newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        console.log(i);
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
        // line(base.x + t * diff.x
    }
    stroke(color.h,color.s,color.b);
    linesBetweenPoints(points);
    drawCurvePoint(newPoints, t);
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

function generateRandomHSBColor() {
    return {
        h: Math.floor(Math.random() * 360),
        b: 100,
        s: 100
    }
}