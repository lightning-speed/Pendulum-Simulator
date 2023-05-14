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
                canvas.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
                element.update();
            })
        }, 50);
    }
    static pause() {

    }
    reset() {

    }
}