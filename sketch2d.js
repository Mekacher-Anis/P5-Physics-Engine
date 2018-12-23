var world = new World(0.016, 9.8, 4);

function setup() {
    let cnv = createCanvas(675, 400);
    cnv.style('display', 'block');
    cnv.style('margin', 'auto');
    cnv.style('margin-top', '50px');
    world.addObj(new Circle(325, 50));
    world.addObj(new Circle(300, 80));
    world.addCnst(new Stk(world.objs[0], world.objs[1], 200));
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
                ellipse(ele.x,ele.y,10);
                break;
            case objTypes.circle:
                ellipse(ele.x, ele.y, ele.R);
                break;
            case objTypes.box:
                rect(ele.x, ele.y, ele.W, ele.H);
                break;
        }
    });
    world.update();
}

onmousedown = function () {
    world.addObj(new Obj(mouseX, mouseY, random(-100, 100), random(-100, 100)));
}