var world = new World(0.016, 9.8, 4);
var cir = new Circle(300, 300, 30);
cir.m = 100;
cir.gravity = false;
world.addObj(cir);

function setup() {
    let cnv = createCanvas(675, 400);
    cnv.style('display', 'block');
    cnv.style('margin', 'auto');
    cnv.style('margin-top', '50px');

    // let box = new Box(337, 395, 675, 10);
    // box.gravity = false;
    // world.addObj(box);

    let box = new Box(350, 200 , 100, 50);
    box.gravity = false;
    world.addObj(box);

    // let cir1 = new Circle(100, 100, 50);
    // cir1.setA(150, 100);
    // cir1.gravity = false;
    // //cir1.m = 100;
    // world.addObj(cir1);

    // let cir2 = new Circle(300, 100, 50);
    // cir2.gravity = false;
    // world.addObj(cir2);

}

function draw() {
    background(color(200));
    strokeWeight(3)
    world.cnst.forEach(ele =>
        line(ele.obj1.x, ele.obj1.y, ele.obj2.x, ele.obj2.y));
    strokeWeight(1);
    noFill();
    world.objs.forEach(ele => {
        if (ele.visible)
            switch (ele.type) {
                case objTypes.point:
                    //point(ele.x, ele.y);
                    ellipse(ele.x, ele.y, 1);
                    break;
                case objTypes.circle:
                    ellipse(ele.x, ele.y, ele.R * 2);
                    line(ele.x,ele.y,ele.x+ele.vX,ele.y+ele.vY);
                    break;
                case objTypes.box:
                    //ele.points.forEach(ele => ellipse(ele.x, ele.y, 3));
                    ellipse(ele.x, ele.y, 1);
                    ele.sticks.forEach(ele => line(ele.obj1.x, ele.obj1.y, ele.obj2.x, ele.obj2.y));
                    strokeWeight(1);
                    break;
            }
    });

    world.update();
}

onmousedown = function () {
    // world.update();
    // world.update();
    //world.addObj(new Obj(mouseX, mouseY, random(-100, 100), random(-100, 100)));
}

onmousemove = () => {
    cir.vX = mouseX - cir.x;
    cir.vY = mouseY - cir.y;
};