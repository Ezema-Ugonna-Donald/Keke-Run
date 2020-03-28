import 'phaser';

export default class LoadingScene extends Phaser.Scene
{
  constructor (key)
  {
    super(key);
  }

// load assets
  preload () {

  // show logo
  let logo = this.add.sprite(this.sys.game.config.width/2, 280, 'logo');

  // progress bar background
  let bgBar = this.add.graphics();

  let barW = 150;
  let barH = 30;

  bgBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2 + 35);
  bgBar.fillStyle(0xF5F5F5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  // progress bar
  let progressBar = this.add.graphics();
  progressBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2 + 35);

  // listen to the "progress" event
  this.load.on('progress', function(value){
    // clearing progress bar (so we can draw it again)
    progressBar.clear();

    // set style
    progressBar.fillStyle(0x9AD98D, 1);

    // draw rectangle
    progressBar.fillRect(0, 0, value * barW, barH);

  }, this);

    // load assets

    // this.load.spritesheet('player', 'assets/playerFramesKA3.png', { frameWidth: 32, frameHeight: 99 });
    this.load.image('background', 'assets/skyWorldKA2.png');
    this.load.image('beam', 'assets/platform.png');
    this.load.image('ground', 'assets/kaGround2.png');

    // Buttons
    this.load.image('up', 'assets/up_button2.png');
    this.load.image('down', 'assets/down_button2.png');
    this.load.image('left', 'assets/left_button2.png');
    this.load.image('right', 'assets/right_button2.png');

    // physical characters
    this.load.image('agbero', 'assets/agbero.png');
    this.load.image('fifty', 'assets/50 naira2.png');
    this.load.image('oneHech', 'assets/100 naira2.png');
    this.load.spritesheet('player', 'assets/playerFramesKA3.png', { frameWidth: 32, frameHeight: 99 });
  }

// called once after the preload ends
  create () {
    // Animation
    // createAnimation ();

    //Load Home Scene
    this.time.addEvent({
                      delay: 2500,
                      repeat: 0,
                      callback: function(){
                        this.scene.start('Home');
                      },
                      callbackScope: this
    });

    // bg.on('pointerdown', function(){
    //   this.scene.start('Boot');
    // }, this);
  }
};
