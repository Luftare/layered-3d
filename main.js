const canvas = document.querySelector('canvas');
const paint = new Paint(canvas);
const input = new GameInput(canvas);
const loop = new Loop({
  onTick: (dtInMs) => {
    const dt = dtInMs / 1000;
    update(dt);
    render(paint);
  },
  animationFrame: true,
});

const player = new Player();

const trees = [...Array(50)].map(() => {
  return new Tree(Math.random() * 1000, Math.random() * 1000);
});

let renderList = [player, ...trees];

const camera = {
  position: new V3(0, 0, -5000),
  width: canvas.width,
  height: canvas.height,
  viewDistance: 2000,
};

function update(dt) {
  player.update(dt);
  input.clearState();
}

function render() {
  canvas.width = canvas.width;
  camera.position.set(player.position).addZ(-1500);
//  paint.ctx.translate(canvas.width * 0.5 - player.position.x, canvas.height * 0.5 - player.position.y);
  renderList.forEach(item => item.render(paint));
}

loop.start();
