// https://javascript.info/bezier-curve

function setup() {
    console.log("loaded");
    createCanvas(innerWidth, innerHeight);

    const points = [];
    points.push({x: 10+500,y: 100+300});
    points.push({x: 60+500,y: 10+300});
    points.push({x: 110+500,y: 100+300});
    threePointBezier(points);
}

function threePointBezier(points) {
    points.forEach(point => {
        fill(255,0,0);

        ellipse(point.x, point.y, 7, 7);
    });
}