import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'player', 4);
    this.scene = scene;

    this.ui = this.scene.scene.get('UI');
    this.isUpBtnDown = false;
    this.isDownBtnDown = false;
    this.isLeftBtnDown = false;
    this.isRightBtnDown = false;

    // enable physics
    this.scene.physics.world.enable(this);
    // add our player to the scene
    this.scene.add.existing(this);
  }

  update(cursors) {
    //  Reset the players velocity (movement)
    this.setVelocity(0);

    //  Player physics properties.
    this.setGravity (30);
    this.setCollideWorldBounds (true);
    // console.log('Up Pressed', this.isUpBtnDown);
    // this.isUpBtnDown = false;

    this.ui.events.on('UpButton', () => {
      this.isUpBtnDown = true;
      if (this.isDownBtnDown === true)
      {
        this.isDownBtnDown = false;
      }
    });

    this.ui.events.on('DownButton', () => {
      this.isDownBtnDown = true;
      if (this.isUpBtnDown === true)
      {
        this.isUpBtnDown = false;
      }
    });

    this.ui.events.on('LeftButton', () => {
      this.isLeftBtnDown = true;
      if (this.isRightBtnDown === true)
      {
        this.isRightBtnDown = false;
      }
    });

    this.ui.events.on('RightButton', () => {
      this.isRightBtnDown = true;
      if (this.isLeftBtnDown === true)
      {
        this.isLeftBtnDown = false;
      }
    });

    if (cursors.left.isDown || this.isLeftBtnDown === true)
    {
        //  Move to the left
        this.setVelocityX(-125);

        this.flipX = false;

        this.anims.play('left');
    }
    else if (cursors.right.isDown || this.isRightBtnDown === true)
    {
        //  Move to the right
        this.setVelocityX(125);

        this.flipX = false;

        this.anims.play('right');
    }
    else
    {
        //  Stand still
        this.anims.stop();

        this.setFrame(4);
    }

    //  Allow the player to jump if they are touching the ground.
    // if (this.cursors.up.isDown && this.player.body.touching.down)
    // {
    //     // this.player.body.setVelocityY = -170;
    //
    // }
    const startY = 491;
    const endY = 458.2

    if (cursors.up.isDown && this.y >= endY || this.isUpBtnDown === true && this.y >= endY)
    {
        this.setVelocityY(-70);
        // console.log(1234);
        // console.log('y', this.y);
        // console.log('x', this.x);
        // console.log(conditionMoveDown);
    }

    if (cursors.down.isDown && this.y < startY || this.isDownBtnDown === true && this.y < startY)
    {
      this.setVelocityY(70);
      // console.log(1234);
      // console.log('y', this.y);
    }
    // let playerMinY = 458.2;
    // let playerMaxY = 493.2;

    // console.log(this.y < 491 && this.y <= 458.2);

  }

  enemyCollison (player)
  {

  }
}
