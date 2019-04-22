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

const trees = [...Array(20)].map(() => {
  return new Tree(Math.random() * 500, Math.random() * 500);
});

const buildings = [...Array(20)].map(() => {
  return new Building(Math.random() * 500, Math.random() * 500);
});

let renderList = [player, ...trees, ...buildings];

const camera = {
  position: new V3(0, 0, -5000),
  width: canvas.width,
  height: canvas.height,
  viewDistance: 4000,
};

function update(dt) {
  player.update(dt);
  input.clearState();
}

function render() {
  canvas.width = canvas.width;
  camera.position
    .setX(player.position.x)
    .setY(player.position.y);
  renderList.forEach(item => item.renderShadow());
  renderList.sort((a, b) => b.position.sqDistanceXY(camera.position) - a.position.sqDistanceXY(camera.position)).forEach(item => item.render());
}

loop.start();
