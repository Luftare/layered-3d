class Player extends VisibleObject {
  constructor() {
    super();
    this.position = new V3(100, 100);
    this.maxSpeed = 200;
    this.layers = [
      {
        type: 'circle',
        radius: 5,
        fill: 'red'
      }
    ]
  }

  update(dt) {
    const movement = new V3();

    if(input.keysDown.a) {
      movement.addX(-1);
    }

    if(input.keysDown.d) {
      movement.addX(1);
    }

    if(input.keysDown.w) {
      movement.addY(-1);
    }

    if(input.keysDown.s) {
      movement.addY(1);
    }

    if(input.keysDown.q) {
      camera.position.z += 500 * dt;
    }

    if(input.keysDown.e) {
      camera.position.z -= 500 * dt;
    }

   movement.limit(this.maxSpeed * dt);
   this.position.add(movement);
  }
}