
class CanvasView extends AppCompactView {
  constructor() {
    super('div')
    this.set({
      className: 'CanvasView'
    })
    this.setStyle({
      width: canvasWidth,
      height: canvasHeight
    })
    this.add(this.canvas = new View('canvas').set({
      width: canvasWidth,
      height: canvasHeight
    }))
    this.ctx = this.canvas.component.getContext('2d');
    window.canvas = this;
  }
  drawLine(from, to) {
    this.ctx.strokeStyle = "#fff"
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(from.x - 1, from.y);
    this.ctx.lineTo(to.x - 1, to.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(from.x + 1, from.y);
    this.ctx.lineTo(to.x + 1, to.y);
    this.ctx.stroke();
  }

  drawBob(pos) {
    const radius = 8;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  drawPendulum(bp) {
    this.drawLine({
      y: 0,
      x: canvasWidth / 2
    }, bp)
    this.drawBob(bp);
  }
}
