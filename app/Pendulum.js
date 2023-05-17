const refreshRate = 100;
const Deg2Rad = Math.PI / 180;


//H = Pendulum length
//P = perpendicular
//B = base
//T = time period / 4
//v = velocity(degree)
//a = acceleration
//initDeg = initial pendulum degree
//deg = Current degree


class Pendulum {
    constructor() {


        //ERROR FACTOR
        this.mass = 1;
        this.color = `rgb(${(Math.random() * 1000) % 255},${(Math.random() * 1000) % 255},${(Math.random() * 1000) % 255})`;
        this.bobPos = {
            y: canvasHeight - 100,
            x: canvasWidth / 2
        }
        this.deg = this.initDeg;
        this.P = canvasHeight - 100;
        this.B = 0;
        this.H = canvasHeight - 100;
        this.v = 0;
        this.setProperties(45, 15)



    }
    update() {
        this.pe = this.len * Math.abs(Math.cos(Math.round(this.deg) / 180 * Math.PI)) * this.mass * g

        this.d1 = new Date();
        this.draw();
        this.P = Math.sin(this.deg / 180 * Math.PI) * this.H;
        this.B = Math.cos(this.deg / 180 * Math.PI) * this.H;
        let TimeFactor = IntervalTime / 1000;



        if (this.deg <= 90)
            //Right Side
            this.v += this.a;
        if (this.deg > 90) {
            //Left Side
            this.v -= this.a;
        }
        this.deg += this.v * TimeFactor;


        //Time Factor: velocity = deg/s, s = 1000ms rate = per sec but since we are updating around 100ms


        canvas.ctx.font = "15px Arial";
        canvas.ctx.fillText(Math.round(this.deg), 10, 50);
        canvas.ctx.fillText('KE: ' + decimalPoints(this.te - this.pe, 3), 10, 70);
        canvas.ctx.fillText('PE: ' + decimalPoints(this.pe, 3), 10, 90);
        if (Math.round(this.deg) == this.initDeg) {
            console.log(this.p1);
            this.p1 = 0;

        }
        this.p1 += IntervalTime;

    }
    setProperties(degree, len) {
        this.ef = 1 - (0.2 * Math.sqrt(degree / 180))

        this.len = len;
        this.t = 0.5 * Math.PI * Math.sqrt(this.len / g);
        this.deg = degree;
        this.initDeg = degree;
        this.v = 0;
        let TimeFactor = IntervalTime / 1000;

        /*
            S = ut + 1/2 at^2;
            here a = acceleration for degree change
            t is the time period of pendulum /4
        */

        let S = 90 - this.initDeg;
        this.a = ((2 * S) / (Math.pow(this.t, 2)) * TimeFactor * this.ef);
        this.pt = 0;
        this.pe = this.len * Math.cos(this.initDeg / 180 * Math.PI) * this.mass * g
        this.ke = 0;
        this.te = this.pe + this.ke;
        console.log(this.pe)
        this.P = Math.sin(this.deg * Deg2Rad) * this.H;
        this.B = Math.cos(this.deg / 180 * Math.PI) * this.H;
    }
    draw() {
        canvas.drawPendulum({ y: this.P, x: canvasWidth / 2 + this.B }, this.color);
    }
    start() {
        this.state = 'running'
    }
    pause() {
        this.state = 'paused'
    }

}
function decimalPoints(num, precision) {
    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
}