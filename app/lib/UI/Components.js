class Button extends View{
  constructor(text){
    super('button');
    this.set({
      innerHTML:text
    })
  }
}

class Text extends View{
  constructor(text){
    super('span');
    this.set({
      innerHTML:text
    })
  }
}


class ComponentTree{
  constructor(componentJsonTree){
    this.tree = componentJsonTree;
    this.components = [];
    for(let i = 0;i<this.tree.length;i++){
      this.components[i] = this.reform(this.tree[i],0);
    }
  }
  reform(json,depth){
    if(depth>30){
      console.log('ComponentTree Depth exceeded the maximum value(30)')
      return;
    }
    const out_component = new View(json.view);
    const style = json.style;
    const innode = json["innode"];
    delete json.innode
    json.style = null;
    console.log(json)
    out_component.set(json);
    out_component.setStyle(style);
    if(innode!=null)
    for(let i = 0;i<innode.length;i++){
      out_component.add(this.reform(innode[i],++depth))
    }
    return out_component;
  }
  setView(view){
    console.log('hmm')
    for(let i = 0;i<this.components.length;i++){
      view.add(this.components[i])
    }
  }
  fromId(id){

  }
}
