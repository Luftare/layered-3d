class Tree extends VisibleObject {
  constructor(x, y) {
    super(x, y);

    this.layers = [
      {
        type: 'circle',
        radius: 10,
        fill: 'darkgreen'
      },
      {
        type: 'circle',
        radius: 8,
        fill: 'lightgreen'
      },
      {
        type: 'circle',
        radius: 6,
        fill: 'darkgreen'
      },
      {
        type: 'circle',
        radius: 4,
        fill: 'lightgreen'
      },
      {
        type: 'circle',
        radius: 2,
        fill: 'darkgreen'
      },
    ];
  }
}