var objs = [];

function setup() {
    let cnv = createCanvas(700, 400, WEBGL);
    cnv.style('display', 'block');
    cnv.style('margin', 'auto');
    cnv.style('margin-top', '50px');
    smooth(8);
}

function draw() {
    background(color(200));
    //noStroke();
    specularMaterial(250, 0, 150);
    directionalLight(250, 250, 250, 10, 10, -10);
    pointLight(255, 255, 255,40,40,40);
}