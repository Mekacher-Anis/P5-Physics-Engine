var world = new World(0.016, 9.8, 4);
var cir = new Circle(10, 10,30);
cir.gravity = false;
world.addObj(cir);

function setup() {
    let cnv = createCanvas(675, 400);
    cnv.style('display', 'block');
    cnv.style('margin', 'auto');
    cnv.style('margin-top', '50px');
    
    // let box = new Box(200, 200, 100, 50);
    // box.gravity = false;
    // world.addObj(box);

    let cir1 = new Circle(100,100,50);
    cir1.setA(150,100);
    //cir1.gravity = false;
    world.addObj(cir1);
    
    let cir2 = new Circle(300,100,50);
    cir2.setA(-150,100)
    //cir2.gravity = false;
    world.addObj(cir2);
    
}

function draw() {
    background(color(200));
    strokeWeight(3)
    world.cnst.forEach(ele =>
        line(ele.obj1.x, ele.obj1.y, ele.obj2.x, ele.obj2.y));
    strokeWeight(1);
    world.objs.forEach(ele => {
        switch (ele.type) {
            case objTypes.point:
                //point(ele.x, ele.y);
                ellipse(ele.x, ele.y, 1);
                break;
            case objTypes.circle:
                ellipse(ele.x, ele.y, ele.R * 2);
                break;
            case objTypes.box:
                strokeWeight(3);
                ele.points.forEach(ele => ellipse(ele.x, ele.y, 3));
                ele.sticks.forEach(ele => line(ele.obj1.x, ele.obj1.y, ele.obj2.x, ele.obj2.y));
                strokeWeight(1);
                break;
        }
    });
    world.update();
}

onmousedown = function () {
    world.addObj(new Obj(mouseX, mouseY, random(-100, 100), random(-100, 100)));
}

onmousemove = () => {
    cir.vX = mouseX - cir.x;
    cir.x = mouseX;
    cir.vY = mouseY - cir.y;
    cir.y = mouseY
};