var objTypes = {
    circle: 'circle',
    box: 'box',
    point: 'point',
    stick: 'stick'
}

class Obj {

    constructor(x, y, vX = 0, vY = 0, aX = 0, aY = 0) {
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.aX = aX;
        this.aY = aY;
        this.type = objTypes.point;
        this.gravity = true; //afected by graviy
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setV(x, y) {
        this.vX = x;
        this.vY = y;
    }

    setA(x, y) {
        this.aX = x;
        this.aY = y;
    }
}

class Box extends Obj {
    constructor(x, y, w = 10, h = w) {
        super(x, y, 0, 0, 0, 0);
        this.H = h;
        this.W = w;
        this.type = objTypes.box;
        this.points = [
            new Obj(x - w / 2, y + h / 2),
            new Obj(x + w / 2, y + h / 2),
            new Obj(x + w / 2, y - h / 2),
            new Obj(x - w / 2, y - h / 2)
        ];
        this.sticks = [
            new Stk(this.points[0], this.points[1], this.W),
            new Stk(this.points[1], this.points[2], this.H),
            new Stk(this.points[2], this.points[3], this.W),
            new Stk(this.points[3], this.points[0], this.H),
        ];
    }
}

class Circle extends Obj {
    constructor(x, y, R = 10) {
        super(x, y, 0, 0, 0, 0);
        this.R = R;
        this.type = objTypes.circle;
    }
}

class Stk {
    constructor(obj1, obj2, length) {
        this.obj1 = obj1;
        this.obj2 = obj2;
        this.mid = new Obj((obj1.x + obj2.x) / 2, (obj1.y + obj2.y) / 2);
        this.length = length;
        this.type = objTypes.stick;
    }

    updatePos() {
        let dist = distance(this.obj1.x, this.obj1.y, this.obj2.x, this.obj2.y);
        let diff = dist - this.length;
        let xDist = (diff * (this.obj2.x - this.obj1.x)) / (2 * dist);
        let yDist = (diff * (this.obj2.y - this.obj1.y)) / (2 * dist);
        this.obj1.x += xDist;
        this.obj1.y += yDist;
        this.obj2.x -= xDist;
        this.obj2.y -= yDist;
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function distanceSq(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

function detectCol(obj, world) {
    //if obj is a point
    if (obj.type == objTypes.point)
        world.objs.forEach(ele => {
            if (ele !== obj)
                switch (ele.type) {
                    case objTypes.point:
                        ptPtCol(ele, obj);
                        break;
                    case objTypes.circle:
                        ptCirCol(obj, ele);
                        break;
                    case objTypes.box:
                        ptBoxCol(obj, ele);
                        break;
                }
        });
    //if obj is a circle
    else if (obj.type == objTypes.circle)
        world.objs.forEach(ele => {
            if (ele !== obj)
                switch (ele.type) {
                    case objTypes.point:
                        ptCirCol(ele, obj);
                        break;
                    case objTypes.circle:
                        cirCirCol(ele, obj);
                        break;
                    case objTypes.box:
                        cirBoxCol(obj, ele);
                        break;
                }
        });
    //if obj is a box
    else if (obj.type == objTypes.box)
        world.objs.forEach(ele => {
            if (ele !== obj)
                switch (ele.type) {
                    case objTypes.point:
                        ptBoxCol(ele, obj);
                        break;
                    case objTypes.circle:
                        cirBoxCol(ele, obj);
                        break;
                    case objTypes.box:
                        boxBoxCol(obj, ele);
                        break;
                }
        });
}

function ptPtCol(pt1, pt2) {
    if (pt1.x == pt2.x && pt1.y == pt2.y)
        console.log('Point Point Collision !!');
}

function ptCirCol(pt, cir) {
    if (distance(pt.x, pt.y, cir.x, cir.y) <= cir.R)
        console.log('Point Circle Collision !!');
}

function ptBoxCol(pt, box) {
    let OM = distance(pt.x, pt.y, box.points[0].x, box.points[0].y);
    let cos1 = cosAngle(vec(box.points[0], box.points[1]), vec(box.points[0], pt));
    let proj1 = cos1 * OM;
    let cos2 = cosAngle(vec(box.points[0], box.points[3]), vec(box.points[0], pt));
    let proj2 = cos2 * OM;
    //console.log('OM ',OM,', cos1 ',cos1,', cos2 ',cos2);

    if ((0 <= proj1 && proj1 <= box.W) &&
        (0 <= proj2 && proj2 <= box.H))
        console.log('Point Box Collision !!');
}

function cirCirCol(cir1, cir2) {
    if (distance(cir1.x, cir1.y, cir2.x, cir2.y) <= cir1.R + cir2.R)
        console.log('Circle Circle Collision !!');
}

function cirBoxCol(circle, box) {
    let rotation = Math.acos(cosAngle(new Vec(1,0),vec(box.points[0],box.points[1])));
    let CircleX = Math.cos(rotation) * (circle.x - box.x) - Math.sin(rotation) * (circle.y - box.y) + box.x;
    let CircleY = Math.sin(rotation) * (circle.x - box.x) + Math.cos(rotation) * (circle.y - box.y) + box.y;
    let DeltaX = CircleX - Math.max(box.x-box.W/2, Math.min(CircleX, box.x + box.W/2));
    let DeltaY = CircleY - Math.max(box.y-box.H/2, Math.min(CircleY, box.y + box.H/2));
    if((DeltaX * DeltaX + DeltaY * DeltaY) < (cir.R * cir.R))
        console.log('Circle Box collision !!');
        
}

function boxBoxCol(box1, box2) {
    box1.points.forEach(ele => {
        if (ptBoxCol(ele, box2))
            console.log('Box Box Collision !!');
    });
}

class World {
    constructor(timeStep = 0.016, G = 9.8, ENL = 1.2, bndX = 1000, bndY = 1000) {
        this.T = timeStep;
        this.G = G;
        this.ENL = ENL; //enlargement factor
        this.bndX = bndX; //world boundry X
        this.bndY = bndY; //world boundry Y
        this.objs = [];
        this.cnst = [];
    };

    addObj(obj) {
        this.objs.push(obj);
    }

    rmvObj(obj) {
        let index = this.objs.indexOf(obj);
        this.objs.splice(index, 1);
    }

    addCnst(obj) {
        this.cnst.push(obj);
    }

    rmvCnst(obj) {
        let index = this.cnst.indexOf(obj);
        this.cnst.splice(index, 1);
    }

    update(times = 1) {
        for (let i = 0; i < times; i++) {
            for (let j = this.objs.length - 1; j >= 0; j--) {
                let ele = this.objs[j];
                //if out of boudry remove it
                if (Math.abs(ele.x) > this.bndX ||
                    Math.abs(ele.y) > this.bndY) {
                    this.objs.splice(j, 1);
                    continue;
                }
                switch (ele.type) {
                    case objTypes.point:
                    case objTypes.circle:
                        this.updateObj(ele);
                        break;
                    case objTypes.box:
                        this.updateBox(ele);
                        break;
                }
            }

            this.cnst.forEach(ele => ele.updatePos());
        }
    }

    updateObj(ele) {
        if (ele.gravity) {
            //calculate gravity (it's not added 
            //to A as it is applyed to all elements)
            ele.vY += this.G * this.T * this.ENL;
        }
        //detect collision
        detectCol(ele, this);
        //calculate new position based on new V and A
        ele.vX += ele.aX * this.T * this.ENL;
        ele.x += ele.vX * this.T * this.ENL;
        ele.vY += ele.aY * this.T * this.ENL;
        ele.y += ele.vY * this.T * this.ENL;
    }

    updateBox(box) {
        if (box.gravity) {
            //calculate gravity (it's not added 
            //to A as it is applyed to all elements)
            box.points.forEach(ele => ele.vY += this.G * this.T * this.ENL);
        }
        //detect collision
        detectCol(box, this);
        //calculate new position based on new V and A
        box.points.forEach(ele => {
            ele.vX += ele.aX * this.T * this.ENL;
            ele.x += ele.vX * this.T * this.ENL;
            ele.vY += ele.aY * this.T * this.ENL;
            ele.y += ele.vY * this.T * this.ENL;
        });
        //update sticks linking corners
        box.sticks.forEach(ele => ele.updatePos());
    }
}