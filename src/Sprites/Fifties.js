import 'phaser';
import Fifty from './Fifty';

export default class Fifties extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children) {
    super (world, scene, children);
    this.scene = scene;

    // Create agberos
    this.createFifties(scene);
  }

  init () {
    let fifty2;
  }

  createFifties (scene)
  {
    for (let i = 0; i < 10; i++)
    {
      //  Create a fifty inside of the 'fifties' group
      this.fifty2 = new Fifty (scene, i * 850, 420);
      // Add to Physics group

      this.add(this.fifty2);
    }
  }

  collectFifty (player, fifty)
  {
    fifty.active = false;
    fifty.visible = false;
    fifty.disableBody();

    // dispatch an event
    this.scene.events.emit('cashCollected2');
  }
}
