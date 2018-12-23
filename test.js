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