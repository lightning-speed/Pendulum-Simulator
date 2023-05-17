
class ControlView extends AppCompactView {
  constructor() {
    super('div');
    this.pendulum = new Pendulum();
    this.add(BREAK());
    this.set({
      className: 'ControlView'
    })
    this.add(new Text('Length (m) :'))
    this.add(this.lenq = new View('input').set({
      type:'number',
      className:'quantityField',
      value: this.pendulum.len,
      onkeydown:()=>this.edit(),
      onchange:()=>this.edit()

    }).setStyle({
      width:'60px',
      marginLeft:'20px',

    }))
    this.add(BREAK());
    this.add(BREAK());

    this.add(new Text('Mass (kg) :'))
    this.add(this.massq = new View('input').set({
      type:'number',
      className:'quantityField',
      value: this.pendulum.mass,
      onkeydown:()=>this.edit()
      ,
      onchange:()=>this.edit()
     
    }).setStyle({
      width:'60px',
      marginLeft:'30px'
    }))
    this.add(BREAK());
    this.add(BREAK());

    this.add(new Text('Rotation (°) :'))
    this.add(this.rotationq = new View('input').set({
      type:'number',
      className:'quantityField',
      value: this.pendulum.initDeg,
      onkeydown:()=>this.edit()
      ,
      onchange:()=>this.edit()
      

    }).setStyle({
      width:'60px',
      marginLeft:'15px'
    }))
    this.add(BREAK());
    this.add(BREAK());

    this.add(new Text('Time Period (s) :'))
    this.add(this.timeq = new View('input').set({
      type:'number',
      className:'quantityField',
      value: decimalPoints(this.pendulum.t*4,2),
      onkeydown:()=>this.edit()
      ,
      onchange:()=>this.edit()
      

    }).setStyle({
      width:'60px',
      marginLeft:'15px'
    }))
    
    this.add(BREAK());
    this.add(BREAK());
    this.add(BREAK());
    this.add(this.PEd = new View().setStyle({
      height:'20px',
      width:'0px',
      backgroundColor:'purple',
      borderRadius:'3px',
      lineHeight:'-5px',
      display:'inline-block'

    }));
    this.add(this.PEv = new View().setStyle({
      marginLeft:'20px',
      display:'inline-block'

    }))
    this.add(BREAK());
    this.add(BREAK());
    this.add(this.KEd = new View().setStyle({
      height:'20px',
      width:'0px',
      backgroundColor:'Yellow',
      borderRadius:'3px',
      display:'inline-block',
      lineHeight:'-5px',
    }));
    this.add(this.KEv = new View().setStyle({
      marginLeft:'20px',
      display:'inline-block'

    }))
    this.add(BREAK());
    this.add(BREAK());
    this.add(this.ce = new View().setStyle({
      height:'32px',
      width:'32px',
      backgroundColor:this.pendulum.color,
      borderRadius:'3px',
      display:'inline-block',
      lineHeight:'-5px',
    }));
    this.add(this.ce = new Button('Delete').setStyle({
      backgroundColor:'red',
      borderRadius:'3px',
      display:'inline-block',
      position:'relative',
      top:'-11px',
      color:'white'
    }).set({
      onclick:()=>{
        this.delete();
      }
    }));
    this.pendulum.afterUpdate = ()=> {
      this.PEd.setStyle({
        width:(100*this.pendulum.pe/this.pendulum.te)+'px'
      })
      this.PEv.set({
        innerHTML: decimalPoints(this.pendulum.pe,1)+'J'
      })
      this.KEv.set({
        innerHTML: decimalPoints(this.pendulum.ke,1) +'J'
      })
  
      this.KEd.setStyle({
        width:(100*this.pendulum.ke/this.pendulum.te)+'px'
      })
    }

    this.pendulum.start();

    Engine.addPendulum(this.pendulum)
    
  }
  edit(){
    if(this.timeq.component.value!='0'&& decimalPoints(this.pendulum.t*4,2) != this.timeq.component.value&&this.lenq.component.value ==this.pendulum.len){
      this.lenq.component.value =  decimalPoints(Math.pow(parseFloat(this.timeq.component.value),2)*g/(4*Math.pow(Math.PI,2)),2)
      console.log('ok'+decimalPoints(Math.pow(parseFloat(this.timeq.component.value),2)*g/(4*Math.pow(Math.PI,2)),3))
    }
    this.pendulum.pause();
    this.pendulum.setProperties(
      parseFloat(this.rotationq.component.value),
      parseFloat(this.lenq.component.value),
      parseFloat(this.massq.component.value),
      )
    this.timeq.component.value =   decimalPoints(this.pendulum.t*4,2)
    this.pendulum.start();
  }
  delete(){
    this.end();
    this.pendulum.delete();
  }
  
}
