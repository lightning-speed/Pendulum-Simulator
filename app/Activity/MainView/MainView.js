const bobRadius = 8;
const canvasWidth = 470;
const canvasHeight = 350;



class MainView extends AppCompactView {
  async onStart() {
    super.onStart();
    console.log('ok')
    this.add(await CreateView('CanvasView'))

  }

}
