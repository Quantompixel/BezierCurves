// https://javascript.info/bezier-curve

function setup() {
    console.log("loaded");
    createCanvas(innerWidth, innerHeight);

    const points = [];
    points.push({
        x: 10 + 500,
        y: 100 + 300
    });
    points.push({
        x: 10 + 500,
        y: 10 + 300
    });
    points.push({
        x: 110 + 500,
        y: 100 + 300
    });
    threePointBezier(points);
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
        const controlPoint1 = {x:points[0].x - i * diff12.x, y:points[0].y - i * diff12.y};
        const controlPoint2 = {x:points[1].x - i * diff23.x, y:points[1].y - i * diff23.y};
        fill(Math.floor(Math.random() * 255));
        line(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y);
    }
}