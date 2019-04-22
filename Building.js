class Building extends VisibleObject {
  constructor(x, y) {
    super(x, y, 0);
    this.velocityZ = 0;

    this.dimensions = {
      x: 20,
      y: 40
    };

    this.height = 1900 * Math.random();

    const layerCount = Math.ceil(this.height / 50);
    this.layers = [...Array(layerCount)].map((_, index) => ({
      type: 'rectangle',
      width: this.dimensions.x - index * 0.5,
      height: this.dimensions.y,
      fill: index % 2 ? 'black' : 'orange',
      angle: index * 0.1
    }));
  }
}