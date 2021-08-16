import Phaser from "phaser";
import config from "./config";
import GameScene from './Scenes/Game';
import BootScene from './Scenes/Boot';
import HomeScene from './Scenes/Home';
import UIScene from './Scenes/UI';
import LoadingScene from './Scenes/LoadingScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene .add('Boot', BootScene);
    this.scene.add('Loading', LoadingScene);
    this.scene .add('Home', HomeScene);
    this.scene.add('Game', GameScene);
    this.scene.add('UI', UIScene);
    this.scene.start('Loading');
  }
}

window.game = new Game();

// window.addEventListener('resize', (event) => {
//   // console.log(window.innerWidth);
//   if (window.innerWidth <= 800 || window.innerHeight <= 600)
//   // this.game.resize (window.innerWidth, window.innerHeight);
//   {
//   }
// });
