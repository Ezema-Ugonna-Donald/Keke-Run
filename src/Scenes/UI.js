import 'phaser';

export default class UIScene extends Phaser.Scene
{
  constructor (key)
  {
    super({ key: 'UI', active: true });
  }

  init () {
    this.cashCollected = 0;
    this.level = 1;
    this.cashToWin = 350;
    this.isWinner = false;
    this.textMsg = '';
    this.textBtnMsg = '';
    this.txtdepth = 0;
    this.graphicFill = 0;
    this.graphicFillBtn = 0;
  }

// called once after the preload ends
  create () {
    // Get Game width and height
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    // Game End UI
    // Message
    let text = this.add.text(gameW/2, gameH/2, this.textMsg, {
      font: '70px Arial',
      fill: '#ffffff'
    });
    text.setOrigin(0.5, 0.5);
    text.depth = 1;

    let gameUI = this.add.graphics();

    // Button
    let textBtn = this.add.text(gameW/2, gameH/1.5, this.textBtnMsg, {
      font: '16px Arial',
      fill: '#ffffff'
    }).setInteractive();
    textBtn.setOrigin(0.5, 0.5);
    textBtn.depth = 1;

    let btn = this.add.graphics();

    // get a reference to the game scene
    this.gameScene = this.scene.get('Game');

    //  The score
    this.gameScene.events.on('GameScene', () => {
      this.scoreText = this.add.text(16, 16, `Cash: ${this.cashCollected}`, { fontSize: '35px', fill: '#fff' });
      this.scoreText.setScrollFactor(0);
      this.levelText = this.add.text(16, 64, `Level: ${this.level}`, { fontSize: '35px', fill: '#fff' });
      this.levelText.setScrollFactor(0);

      this.upBtn = this.add.sprite(590, 80, 'up').setInteractive();
      this.upBtn.setOrigin(0.5, 0.5);
      this.upBtn.setScrollFactor(0);
      this.upBtn.setVisible(false);
      this.downBtn = this.add.sprite(590, 176, 'down').setInteractive();
      this.downBtn.setOrigin(0.5, 0.5);
      this.downBtn.setScrollFactor(0);
      this.downBtn.setVisible(false);
      this.leftBtn = this.add.sprite(484, 136, 'left').setInteractive();
      this.leftBtn.setOrigin(0.5, 0.5);
      this.leftBtn.setScrollFactor(0);
      this.leftBtn.setVisible(false);
      this.rightBtn = this.add.sprite(686, 136, 'right').setInteractive();
      this.rightBtn.setOrigin(0.5, 0.5);
      this.rightBtn.setScrollFactor(0);
      this.rightBtn.setVisible(false);

      if (window.innerWidth <= 1366)
      {
        this.upBtn.setVisible(true);
        this.downBtn.setVisible(true);
        this.leftBtn.setVisible(true);
        this.rightBtn.setVisible(true);

        this.upBtn.on('pointerdown', () => {
          // Emit Game Over event
          this.events.emit('UpButton');
          console.log('UP');
        });

        this.downBtn.on('pointerdown', () => {
          // Emit Game Over event
          this.events.emit('DownButton');
        });

        this.leftBtn.on('pointerdown', () => {
          // Emit Game Over event
          this.events.emit('LeftButton');
        });

        this.rightBtn.on('pointerdown', () => {
          // Emit Game Over event
          this.events.emit('RightButton');
        });
      }
    });

    // listen for event from that scene
    this.gameScene.events.on('cashCollected', () => {
      this.cashCollected += 100;
      this.scoreText.setText(`Cash: ${this.cashCollected}`);
    });

    this.gameScene.events.on('cashCollected2', () => {
      this.cashCollected += 50;
      this.scoreText.setText(`Cash: ${this.cashCollected}`);
    });

    this.gameScene.events.on('jamAgbero', () => {
      if (this.cashCollected > 0)
        this.cashCollected -= 50;

      this.scoreText.setText(`Cash: ${this.cashCollected}`);
    });

    this.gameScene.events.on('GameOver', () => {
      if (this.cashCollected >= this.cashToWin && this.cashCollected % this.cashToWin >= 50)
      {
        this.gameScene.scene.pause();

        this.textMsg = 'Great Job, You Win!!';
        text.setText(this.textMsg);
        text.setVisible(true);

        this.textBtnMsg = 'Next Level';
        textBtn.setText(this.textBtnMsg);
        textBtn.setVisible(true);

        this.graphicFill = 0.7;
        this.graphicFillBtn = 1;

        this.isWinner = true;
        gameUI.fillStyle(0x000000, this.graphicFill);
        gameUI.fillRect(gameW/2 - text.width/2 - 10, gameH/2 - text.height/2 - 10, text.width + 20, text.height + 140);
        gameUI.setVisible(true);

        btn.fillStyle(0x5BE272, this.graphicFillBtn);
        btn.fillRect(gameW/2 - textBtn.width/2 - 10, gameH/1.5 - textBtn.height/2 - 10, textBtn.width + 20, textBtn.height + 20);
        btn.setVisible(true);

        // Restart Game
        textBtn.on('pointerdown', () => {
          // this.gameScene.scene.resume();
          text.setVisible(false);
          textBtn.setVisible(false);
          gameUI.setVisible(false);
          btn.setVisible(false);
          this.levelText.setVisible(false);
          this.level++;
          this.cashToWin += 350;
          this.gameScene.scene.restart();
        });
      }

      if (this.cashCollected <= this.cashToWin && this.cashCollected % this.cashToWin < 50)
      {
        this.isWinner = false;
        this.gameScene.scene.pause();

        this.textMsg = 'O boy, you lose!!';
        text.setText(this.textMsg);
        text.setVisible(true);

        this.textBtnMsg = 'Restart';
        textBtn.setText(this.textBtnMsg);
        textBtn.setVisible(true);

        this.graphicFill = 0.7;
        this.graphicFillBtn = 1;

        gameUI.fillStyle(0x000000, this.graphicFill);
        gameUI.fillRect(gameW/2 - text.width/2 - 10, gameH/2 - text.height/2 - 10, text.width + 20, text.height + 140);
        gameUI.setVisible(true);

        btn.fillStyle(0xFFBC42, this.graphicFillBtn);
        btn.fillRect(gameW/2 - textBtn.width/2 - 10, gameH/1.5 - textBtn.height/2 - 10, textBtn.width + 20, textBtn.height + 20);
        btn.setVisible(true);

        // Restart Game
        textBtn.on('pointerdown', () => {
          this.cashCollected = 0;
          text.setVisible(false);
          textBtn.setVisible(false);
          gameUI.setVisible(false);
          btn.setVisible(false);
          this.scoreText.setVisible(false);
          this.levelText.setVisible(false);
          this.gameScene.scene.restart();
        });
      }
    });
  }

  upButton ()
  {

  }

  down ()
  {

  }

  left ()
  {

  }

  right ()
  {

  }
};
