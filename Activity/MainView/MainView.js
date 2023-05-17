


class MainView extends AppCompactView {
  async onStart() {
    super.onStart();
    console.log('ok')
    this.add(await CreateView('CanvasView'))
    Engine.init();
    Engine.start();
    this.controlViewPane = new View().set({
      className:'controlPane'
    })
    this.add(this.controlViewPane);
    this.controlViewPane.add(new Button('Create +').setStyle({
      width:'calc(100% - 25px)',
      marginLeft:'12px',
      backgroundColor:'white',
      color:'black',
    }).set({
      onclick:async ()=>{
        this.controlViewPane.add(await CreateView('ControlView'))
      }
    }))
    this.controlViewPane.add(await CreateView('ControlView'))
    this.playButton = new View('button').setStyle({
      width:'40px',
      height:'40px',
      position:'absolute',
      left:'calc(50% - 80px)',
      bottom:'50px',
      color:'orange',
      backgroundImage:'linear-gradient(to right, rgb(40,40,70),rgb(70,30,70))'
      
    }).set({
      innerHTML:'pause',
      className:'material-icons',
      onclick:()=>{
        if(this.playButton.component.innerHTML=='play_arrow'){
          Engine.start();
          this.playButton.component.innerHTML='pause'

        }else{
          Engine.pause();
          this.playButton.component.innerHTML='play_arrow'
        }
      }
    })

    this.add(this.playButton)
  }

}
