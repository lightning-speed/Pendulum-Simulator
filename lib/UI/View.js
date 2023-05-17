var CurrentTheme


class View {
  constructor(type) {
    this.component = document.createElement(type == null ? "div" : type);
    this.children = [];
    if (navigator.theme != null) {
      if (type == "button" && navigator.theme.buttonTheme != null) {
        this.setStyle(navigator.theme.buttonTheme);
      }
    }
  }

  add(view) {
    this.component.appendChild(view.component);
    this.children.push(view);
    view.parent = this;
    return this;
  }
  addBefore(view) {
    this.component.insertBefore(view.component, this.children[0].component);
    this.children.unshift(view);
    view.parent = this;
    return this;
  }
  remove(view) {
    const index = this.children.indexOf(view);
    if (index != -1) {
      this.children.splice(index, 1);

      view.end();
    } else {
      console.log("View is not a part of this view");
      console.log(view);
    }
  }
  end() {
    this.ending = true;
    this.endChildren();

    this.component.remove();
  }
  endChildren() {
    this.children.forEach((child) => {
      child.end();
    });
    this.children = [];
  }
  setClass(classes) {
    this.component.className = classes;
    return this;
  }
  setStyle(style) {
    for (var prop in style) this.component.style[prop] = style[prop];
    return this;
  }
  setTransitionStyle(style,time){
    this.setStyle({
      transition:time+"s ease"
    })
    setTimeout(()=>{
      this.setStyle({...style})
    },20);
  }
  set(edits) {
    for (var prop in edits) this.component[prop] = edits[prop];
    return this;
  }
}

const Root = new View();
Root.component = document.getElementById("root");

class AppCompactView extends View {
  constructor(TRANSITION) {
    super();
    if(TRANSITION!=null&&TRANSITION==1){
      this.setStyle({
        position:'absolute',
        left:'100%',
        top:'0%',
        transition:'0.3s ease',
      })
      setTimeout(()=>{
        this.setStyle({
          left:'0%'
        })
      },50)
    }

  }
  setTheme(theme) {

  }
  onStart() {
    this.setStyle({
      height:'100%',
      width:'100%'
    })
  }

}



async function importActivity(name) {
  await Scripts.load("./Activity/" + name + "/" + name + ".js");
  await Scripts.loadCss("./Activity/" + name + "/" + name + ".css");
}

async function CreateView(name) {
  await Scripts.load("./Views/" + name + "/" + name + ".js");
  await Scripts.loadCss("./Views/" + name + "/" + name + ".css");
  return eval(`new ${name}`)
}
function setTheme(theme){
 CurrentTheme = theme
}
async function importTheme(name) {
  await Scripts.loadCss("./Themes/" + name + ".css");
}
