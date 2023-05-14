const PUSH_ACTIVITY = 1;
const OVERRIDE_ACTIVITY = 1;


class Instance {
  constructor() {
    this.AppViews = [];
  }
  async initiateActivity(activityName,TYPE,TRANSITION){
    await importActivity(activityName);

    AppInstance.openActivity(eval(`new ${activityName}(${TRANSITION})`),TYPE);
  }
  openActivity(view, TYPE,TRANSITION) {
    Root.endChildren();
    Root.add(view);
    if (TYPE==PUSH_ACTIVITY) this.AppViews.push(view);
    view.onStart();
    if (this.currentView != null)
      if (this.currentView.finish != null) {
        this.currentView.finish();
      }
    this.currentView = view;
  }
  popActivity() {
    if (this.AppViews.length <= 1) {
      //END
    }
    this.AppViews.pop();
    this.openView(this.AppViews.pop());
  }
}

function BREAK() {
  return new View("br");
}
