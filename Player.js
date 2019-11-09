class Player extends VisibleObject {
  constructor() {
    super(200, 200, -20);
    this.velocity = new V3(0, 0, 0);
    this.height = 50;
    this.maxSpeed = 150;
    this.angle = 0;
    this.layers = [...Array(1)].map((_, i) =>
      ({
        type: 'circle',
        radius: 5,
        fill: i < 4 ? 'white' : 'grey'
      }))

  }

  update(dt) {
    const movement = new V3();

    if (input.keysDown.a) {
      this.angle -= dt;
    }

    if (input.keysDown.d) {
      this.angle += dt;
    }

    if (input.keysDown.w) {
      movement.addY(-1);
    }

    if (input.keysDown.s) {
      movement.addY(1);
    }

    if (input.keysDown.q) {
      camera.position.z += 800 * dt;
    }

    if (input.keysDown.e) {
      camera.position.z -= 800 * dt;
    }

    if (this.position.z > 0) {
      this.velocity.z = 0;
      this.position.z = 0;
    }

    if (input.keysDownOnce[' '] && this.position.z === 0) {
      this.velocity.z -= 500;
    }

    this.velocity.z += 2000 * dt;


    movement.scale(5).limit(this.maxSpeed * dt).rotateZ(this.angle);
    this.position.add(movement);
    this.position.scaledAdd(dt, this.velocity);

    paint.viewTransform.angle = this.angle;
  }
}
