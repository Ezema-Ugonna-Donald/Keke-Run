import "phaser";

export default {
  type: Phaser.AUTO,
  scale: {
    parent: "phaser-example",
    mode: Phaser.DOM.RESIZE,
    // autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 800,
    height: 600,
    // max: {
    //   width: 1600,
    //   height: 1200,
    // }
  },
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
}
