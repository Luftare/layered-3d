class VisibleObject {
  constructor(x, y, z = 0) {
    this.position = new V3(x, y, z);
    this.layers = [];
    this.height = 100;
  }

  static shadowColor = '#444';

  static shadowOffset = {
    x: Math.sin(0.15),
    y: Math.sin(0.1)
  };

  update() { }

  render() {
    const layerHeight = this.getLayerHeight();

    this.layers.forEach((layer, index) => {
      const absolutePosition = this.position.clone().addZ(-layerHeight * index)
      const projected = this.getProjected(absolutePosition);
      const scale = this.getScaleAt(absolutePosition);
      if (scale <= 0) return;

      if (layer.type === 'circle') {
        paint.circle({
          position: projected,
          radius: layer.radius * scale,
          fill: layer.fill
        });
      } else if (layer.type === 'rectangle') {
        paint.rect({
          width: layer.width * scale,
          height: layer.height * scale,
          position: projected,
          anchor: { x: 0.5, y: 0.5 },
          fill: layer.fill,
          angle: layer.angle
        });
      }
    });
  }

  renderShadow() {
    const layerHeight = this.getLayerHeight();

    this.layers.forEach((layer, index) => {
      const layerZ = layerHeight * index - this.position.z;
      const absolutePosition =
        this.position.clone()
          .addX(layerZ * VisibleObject.shadowOffset.x)
          .addY(layerZ * VisibleObject.shadowOffset.y)
          .setZ(0);

      const projected = this.getProjected(absolutePosition);
      const scale = this.getScaleAt(absolutePosition);

      if (layer.type === 'circle') {
        paint.circle({
          position: projected,
          radius: layer.radius * scale,
          fill: VisibleObject.shadowColor
        });
      } else if (layer.type === 'rectangle') {
        paint.rect({
          width: layer.width * scale,
          height: layer.height * scale,
          position: projected,
          anchor: { x: 0.5, y: 0.5 },
          fill: VisibleObject.shadowColor,
          angle: layer.angle
        });
      }
    });
  }

  getProjected(position) {
    const relativePosition = position.clone().subtract(camera.position);

    return {
      x: relativePosition.x * camera.viewDistance / relativePosition.z + canvas.width * 0.5,
      y: relativePosition.y * camera.viewDistance / relativePosition.z + canvas.height * 0.5,
    };
  }

  getScaleAt(position) {
    return camera.viewDistance / (position.z - camera.position.z);
  }

  getLayerHeight() {
    return this.height / Math.max(1, (this.layers.length - 1));
  }
}