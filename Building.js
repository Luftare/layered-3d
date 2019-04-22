class Building extends VisibleObject {
  constructor(x, y) {
    super(x, y);

    this.dimensions = {
      x: 50,
      y: 25
    };

    this.height = 900 * Math.random();

    const layerCount = Math.ceil(this.height / 20);
    this.layers = [...Array(layerCount)].map((_, index) => ({
      type: 'rectangle',
      width: this.dimensions.x,
      height: this.dimensions.y,
      fill: index % 2 ? 'lightgrey' : 'grey'
    }));
  }
}