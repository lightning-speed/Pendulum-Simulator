


class MainView extends AppCompactView {
  async onStart() {
    super.onStart();
    console.log('ok')
    this.add(await CreateView('CanvasView'))
    Engine.init();
    Engine.addPendulum(new Pendulum());
    Engine.start();
  }

}
