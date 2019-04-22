class Tree extends VisibleObject {
  constructor(x, y) {
    super(x, y);

    this.height = 100;

    const layerCount = 7;
    this.layers = [...Array(layerCount)].map((_, index) => ({
      type: 'circle',
      radius: 10 * (1.05 - (index / layerCount)),
      fill: index % 2 ? 'lightgreen' : 'darkgreen'
    }));
  }
}