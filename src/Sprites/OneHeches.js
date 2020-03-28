import 'phaser';
import OneHech from './OneHech';

export default class OneHeches extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children) {
    super (world, scene, children);
    this.scene = scene;

    // Create agberos
    this.createOneHeches(scene);
  }

  init () {
    let oneHech2;
  }

  createOneHeches (scene)
  {
    for (let i = 0; i < 8; i++)
    {
      //  Create a oneHech inside of the 'oneHeches' group
      this.oneHech2 = new OneHech (scene, i * 800, 350);
      // Add to Physics group

      this.add(this.oneHech2);
    }
  }

  collectOneHech (player, oneHech)
  {
    oneHech.active = false;
    oneHech.visible = false;
    oneHech.disableBody();

    // dispatch an event
    this.scene.events.emit('cashCollected');
  }
}
