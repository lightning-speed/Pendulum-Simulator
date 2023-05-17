const bobRadius = 8;
const canvasWidth = 440;
const canvasHeight = 300;


async function startApp() {
  importTheme('default')
  AppInstance = new Instance();
  await AppInstance.initiateActivity('MainView')

}
