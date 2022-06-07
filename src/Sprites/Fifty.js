import 'phaser';

export default class Fifty extends Phaser.Physics.Arcade.Image {
  constructor (scene, x, y) {
    super(scene, x, y, 'fifty');
    this.scene = scene;

    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scene
    this.scene.add.existing(this);

    // move money
    // this.timedEvent = this.scene.time.addEvent({
    //                           delay: 1500,
    //                           callback:  this.move,
    //                           loop: true,
    //                           callbackScope: this
    //                         });

    this.move();
  }

  update ()
  {
    this.move ()
  }

  move ()
  {
     this.setCollideWorldBounds(true);

     this.setVelocity(65, 70);
     this.setBounce(1, 1);

     if (this.x === 3410)
     {
       this.setVelocity(-65, 70);
     }

     if (this.x === 5)
     {
       this.setVelocity(65, 70);
     }

     // this.setBounce(1, 2);
     this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(5, 220, 3410, 490));
  }

}
