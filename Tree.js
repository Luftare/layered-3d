class Tree extends VisibleObject {
  constructor(x, y, z) {
    super(x, y, z);

    this.height = randomBetween(50, 200);
    const baseRadius = randomBetween(5, 8) + this.height / 100;

    const layerCount = Math.round(this.height / 20);
    this.layers = [...Array(layerCount)].map((_, index) => ({
      type: 'circle',
      radius: baseRadius * (1.05 - (index / layerCount)),
      fill: index % 2 ? 'green' : 'darkgreen'
    }));
  }
}