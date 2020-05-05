import 'phaser';

export default class Agbero extends Phaser.Physics.Arcade.Image {
  constructor (scene, x, y) {
    super(scene, x, y, 'agbero');
    this.scene = scene;

    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scene
    this.scene.add.existing(this);

    // move agbero
    // this.timedEventAgbero = this.scene.time.addEvent({
    //                           delay: 1500,
    //                           callback:  this.move,
    //                           loop: true,
    //                           callbackScope: this
    //                         });

    this.move();
  }

  update ()
  {

  }

  move ()
  {
     this.setCollideWorldBounds(true);

     this.setVelocity(100, 100);
     this.setBounce(1, 1);

     if (this.x === 3410)
     {
       this.setVelocity(-100, 100);
     }

     if (this.x === 5)
     {
       this.setVelocity(100, 100);
     }

     this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(5, 220, 3410, 490));
  }
}
