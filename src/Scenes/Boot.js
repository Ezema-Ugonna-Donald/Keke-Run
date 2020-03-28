import 'phaser';

export default class BootScene extends Phaser.Scene
{
  constructor (key)
  {
    super(key);
  }

// load assets
  preload () {
    // load scene asset
    this.load.image('logo', 'assets/GameIntro2.png');
  }

// called once after the preload ends
  create () {
    this.scene.start('Loading');
  }
};
