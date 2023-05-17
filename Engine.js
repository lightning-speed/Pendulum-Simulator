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
            canvas.ctx.clearRect(0, 0, canvasWidth, canvasHeight)

            this.pendulums.forEach(element => {
                if (element.state != 'running') return;
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
    static remove(pendulum){
        this.pendulums.splice(this.pendulums.indexOf(pendulum),1)
    }
    reset() {

    }
}