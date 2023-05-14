


class MainView extends AppCompactView {
  async onStart() {
    super.onStart();
    console.log('ok')
    this.add(await CreateView('CanvasView'))

  }

}
