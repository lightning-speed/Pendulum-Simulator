const bobRadius = 8;
const canvasWidth = 470;
const canvasHeight = 350;


async function startApp() {
  importTheme('default')
  AppInstance = new Instance();
  AppInstance.initiateActivity('MainView')
  Engine.init();
  Engine.addPendulum(new Pendulum());
  Engine.start();
}
