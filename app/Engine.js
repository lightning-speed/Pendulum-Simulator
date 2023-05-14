class Engine {
    static init() {
        this.pendulums = [];
    }
    static addPendulum(pedulum) {
        this.pendulums.push(pendulum);
    }
    static start() {
        this.pendulums.forEach(element => {
            element.start();
        });
    }
    static pause() {

    }
    reset() {

    }
}