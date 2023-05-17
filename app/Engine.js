const IntervalTime = 10;
const g = 9.8;

class Engine {
    static init() {
        this.pendulums = [];
    }
    static addPendulum(pendulum) {
        this.pendulums.push(pendulum);
    }
    static start() {
        this.pendulums.forEach(element => {
            element.start();
        });
        this.interval = setInterval(() => {
            this.pendulums.forEach(element => {
                if (element.state != 'running') return;
                canvas.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
                element.update();
            })
        }, IntervalTime);
    }
    static pause() {
        this.pendulums.forEach(element => {
            element.pause();
        });
        clearInterval(this.interval);
    }
    reset() {

    }
}