const refreshRate = 100;
const Rad2Deg = Math.PI / 180;



class Pendulum {
    constructor() {
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
        this.rate = 4;
        this.vu = 0;
        this.a = 0.1;
    }
    update() {
        canvas.drawPendulum({ y: this.P, x: canvasWidth / 2 + this.B });
        this.P = Math.sin(this.deg / 180 * Math.PI) * this.H;
        this.B = Math.cos(this.deg / 180 * Math.PI) * this.H;
        if (this.deg < 90)
            this.vu += this.a;
        else if (this.deg > 90) {
            this.vu -= this.a;
        }
        this.deg += this.vu;
        canvas.ctx.font = "16px Arial";
        canvas.ctx.fillText(Math.round(this.deg), 10, 50);

    }
    start() {
        this.state = 'running'
    }

}