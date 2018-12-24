class Vec {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.length = Math.sqrt(x*x+y*y);
    }
}

function vec(obj1,obj2) {
    return new Vec((obj2.x-obj1.x),(obj2.y-obj1.y));
}

function cosAngle(v1,v2){
    return (v1.x*v2.x + v1.y*v2.y)/(v1.length * v2.length); 
}