const refreshRate = 100;
const Rad2Deg = Math.PI / 180;




class Pendulum {
    constructor() {
        this.len = 1;;
        this.color = '#fff';
        this.mass = 1;
        this.pe = 0.5;
        this.len = 1;
        this.bobPos = {
            y: canvasHeight - 100,
            x: canvasWidth / 2
        }
        this.deg = 10;
        this.P = canvasHeight - 100;
        this.B = 0;
        this.H = canvasHeight - 100;
        this.v = 0;
        let TimeFactor = IntervalTime;

        this.a = (2 / (15 * 16 / Math.sin((90 - 10) / 180 * Math.PI))) * TimeFactor;
        this.pt = new Date().getTime();


    }
    update() {
        canvas.drawPendulum({ y: this.P, x: canvasWidth / 2 + this.B });
        this.P = Math.sin(this.deg / 180 * Math.PI) * this.H;
        this.B = Math.cos(this.deg / 180 * Math.PI) * this.H;



        if (this.deg < 90)
            //Right Side
            this.v += this.a;
        else if (this.deg > 90) {
            //Left Side
            this.v -= this.a;
        }

        //Time Factor: velocity = deg/s, s = 1000ms rate = per sec but since we are updating around 100ms

        let TimeFactor = IntervalTime / 1000;

        this.deg += this.v * TimeFactor;
        canvas.ctx.font = "16px Arial";
        canvas.ctx.fillText(Math.round(this.deg), 10, 50);
        if (Math.round(this.deg) == 10) {
            console.log(new Date().getTime() - this.pt);
            this.pt = new Date().getTime();
        }

    }
    start() {
        this.state = 'running'
    }

}