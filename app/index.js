

async function startApp() {
  importTheme('default')
  AppInstance = new Instance();
  AppInstance.initiateActivity('MainView')
}
