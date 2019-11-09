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


const trees = [...Array(10)].map(() => {
  const x = randomBetween(0, 500);
  const y = randomBetween(0, 500);
  return new Tree(x, y);
});

const buildings = [...Array(20)].map(() => {
  const x = randomBetween(0, 500);
  const y = randomBetween(0, 500);
  return new Building(x, y);
});

let renderList = [player, ...trees, ...buildings];

pushObjectsApartFromEachOther([...trees, ...buildings, player], 25, 5);

function pushObjectsApartFromEachOther(objects, cycles = 25, pushDistance = 5) {
  [...Array(cycles)].forEach(() => {
    objects.forEach((object, i, list) => {
      const closest = list.filter(other => other !== object).sort((a, b) => a.position.sqDistanceXY(object.position) - b.position.sqDistanceXY(object.position))[0];
      const toClosest = object.position.clone().subtract(closest.position).setZ(0).normalize().scale(pushDistance);
      if (toClosest.length < 120) {
        object.position.add(toClosest);
      }
    })
  })
}

const camera = {
  position: new V3(0, 0, -2000),
  width: canvas.width,
  height: canvas.height,
  viewDistance: 2000,
};

function update(dt) {
  buildings.forEach(building => building.update(dt));
  player.update(dt);

  input.clearState();
}


function render() {
  canvas.width = canvas.width;

  camera.position
    .setX(player.position.x)
    .setY(player.position.y)
    .setZ(player.position.z * 0.5 - 2000)
  renderList.forEach(item => item.renderShadow());
  renderList.sort((a, b) => b.position.sqDistanceXY(camera.position) - a.position.sqDistanceXY(camera.position)).forEach(item => item.render());
}

loop.start();
