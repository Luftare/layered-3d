class Building extends VisibleObject {
  constructor(x, y, z) {
    super(x, y, z);

    this.dimensions = {
      x: randomBetween(20, 70),
      y: randomBetween(20, 100)
    };

    this.height = randomBetween(100, 500);

    const layerCount = Math.ceil(this.height / 30);
    const angle = randomBetween(0, Math.PI * 2);

    this.layers = [...Array(layerCount)].map((_, index) => ({
      type: 'rectangle',
      width: this.dimensions.x,
      height: this.dimensions.y,
      fill: index % 2 ? 'black' : 'darkgrey',
      angle,
    }));
  }
}