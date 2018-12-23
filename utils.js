class Vec {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function vec(obj1,obj2) {
    return new Vec((obj2.x-obj1.x),(obj2.y-obj1.y));
}