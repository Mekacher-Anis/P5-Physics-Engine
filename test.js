// function Car(maker, model) {
//     this.maker = maker;
//     this.model = model;
// }

// Car.prototype.drive = function () {
//     console.log("Zoom!");
// }

// function Tesla(model, chargetime) {
//     Car.call(this, 'Tesla', model);
//     this.chargetime = chargetime;
// }

// Tesla.prototype = Object.create(Car.prototype);
// Tesla.prototype.constructor = Tesla;

// Tesla.prototype.charge = function () {
//     console.log("Charging...");
// }

// Car.prototype.stop = () => console.log('Stopped...');


// let car = new Car('Lenovo','Madrid');
// car.__proto__.start = () => console.log('Started...');
// let tesla = new Tesla('3','9h');
// console.log(car);
// console.log(tesla);


    // //Force applied from obj1 on obj2
    // let forceX = obj1.m * obj1.oldAX; //Fx = m * aX
    // let forceY = obj1.m * obj1.oldAY; //Fy = m * aY
    // console.log('F(',forceX,',',forceY,')');
    
    // //oposite reaction
    // obj1.aX -= forceX / obj1.m;
    // obj1.aY -= forceY / obj1.m;
    // //action :P
    // obj2.aX += forceX / obj2.m;
    // obj2.aY += forceY / obj2.m;


    // //Force applied from obj2 on obj1
    // forceX = obj2.m * obj2.oldAX;
    // forceY = obj2.m * obj2.oldAY;
    // console.log('F(',forceX,',',forceY,')');

    // //oposite reaction
    // obj2.aX -= forceX / obj2.m;
    // obj2.aY -= forceY / obj2.m;
    // //action :P
    // obj1.aX += forceX / obj1.m;
    // obj1.aY += forceY / obj1.m;