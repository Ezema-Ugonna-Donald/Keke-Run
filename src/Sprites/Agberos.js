import 'phaser';
import Agbero from './Agbero';

export default class Agberos extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children) {
    super (world, scene, children);
    this.scene = scene;

    // Create agberos
    this.createAgberos(scene);
  }

  init () {
    let agbero2;
  }

  createAgberos(scene)
  {
    for (let i = 0; i < 6; i++)
    {
      //  Create a agbero inside of the 'agberos' group
      this.agbero2 = new Agbero (scene, i * 900, 250);
      // Add to Physics group

      this.add(this.agbero2);
    }
  }

  update()
  {
    this.getAgberoPosition(this.agbero2);
  }

  getAgberoPosition(agbero) {
    // console.log(agbero.body);
    if (agbero.body.y <= 230)
    {
      // console.log('true');
      agbero.body.setVelocityY(100);
    }
  }

  jamAgbero (player, agbero)
  {
    agbero.active = false;
    agbero.visible = false;
    agbero.disableBody();

    // dispatch an event
    this.scene.events.emit('jamAgbero');
  }
}
