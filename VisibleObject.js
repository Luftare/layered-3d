class VisibleObject {
  constructor(x, y) {
    this.position = new V3(x, y, 0);
    this.layers = [];
    this.layerHeight = 30;
  }
  
  render() {
    const relativePosition = this.position.clone().subtract(camera.position);
    
    this.layers.forEach((layer, index) => {
      const relativeZ = relativePosition.z - this.layerHeight * index;
      const distanceScale = camera.viewDistance / relativeZ;
      
      const projected = {
        x: relativePosition.x * camera.viewDistance / relativeZ + canvas.width * 0.5,
        y: relativePosition.y * camera.viewDistance / relativeZ + canvas.height * 0.5
      };
      
      paint.circle({
        position: projected,
        radius: layer.radius * distanceScale,
        fill: layer.fill
      });      
    });
  }
}