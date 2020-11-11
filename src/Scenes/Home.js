import 'phaser';

export default class HomeScene extends Phaser.Scene
{
  constructor (key)
  {
    super(key);
  }

// called once after the preload ends
  create () {
    // set background asset
    let bg = this.add.sprite(0, 0, 'newBackground').setInteractive();
    bg.setOrigin(0, 0);

    // let bgGround = this.add.sprite(0, 565, 'ground');
    // bgGround.setScale(1.5);

    // Get Game width and height
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    // Welcome Message
    let title = this.add.text(gameW/2, gameH/2.5, 'KEKE RUN', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setInteractive();
    title.setOrigin(0.5, 0.5);
    title.depth = 1;

    let text = this.add.text(gameW/2, gameH/2, '😄 DO HAVE FUN!!*_*!!', {
      font: '40px Arial',
      fill: '#ffffff'
    }).setInteractive();
    text.setOrigin(0.5, 0.5);
    text.depth = 1;

    // text background
    let textBg = this.add.graphics().setInteractive();
    textBg.fillStyle(0xFFBC42, 1);
    textBg.fillRect(gameW/2 - text.width/2 - 10, gameH/2 - text.height/2 - 10, text.width + 20, text.height + 20);

    let titleBg = this.add.graphics().setInteractive();
    titleBg.fillStyle(0x000000, 0.9);
    titleBg.fillRect(gameW/2 - text.width/2 - 10, gameH/2.5 - text.height/2 - 10, text.width + 20, text.height + 20);

  //   let loadTimer = this.time.addEvent({
  //                     delay: 3500,
  //                     repeat: 0,
  //                     callback: function(){
  //                       this.scene.start('Game');
  //                     },
  //                     callbackScope: this
  // });
  //
  // loadTimer.paused = true;



  // Start Game
  bg.on('pointerdown', () => {
    // loadTimer.paused = false;
    this.scene.start('Game');
  });

    // this.scene.start('Game');
  }
};
