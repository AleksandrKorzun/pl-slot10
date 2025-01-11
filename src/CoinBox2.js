import Utils from "@holywater-tech/ads-builder/framework/Utils";
import Screen from "./Screen";
import { POSITIONS, SCALES } from "./constants/Constants";

export default class CoinBox2 extends Phaser.GameObjects.Container {
  constructor(scene, count) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.countCoin = count || 4832;
    this.addCoinBox();
    this.addCoins();
  }

  addCoinBox() {
    this.countCoin = 4832;
    this.box = this.scene.add
      .image(0, 0, "coin_box")
      .setDepth(54)
      .setScale(1.7, 1.3)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.coinText = this.scene.add
      .text(0, 0, this.numberWithCommas(this.countCoin), {
        font: `bold ${this.countCoin > 5000 ? 64 : 70}px BerlinSansFBDemiBold`,
        fill: "#c4a549",
      })
      .setDepth(120)
      .setOrigin(`${this.countCoin > 5000 ? 0.4 : 0.3}`, 0.5);
    this.add([this.box, this.coinText]);
    this._sort();
  }

  changeCount(x, duration = 2000, countMoney) {
    this.winSound = Utils.addAudio(this.scene, "win", 0.5, true);
    this.animationSecond = this.scene.tweens.addCounter({
      onStart: () => {
        this.setAlpha(1);
        this.changeSpeedCoin(8);
      },
      onComplete: () => {
        setTimeout(() => this.setAlpha(0), 700);
        this.winSound.stop();
        this.changeSpeedCoin(50);
        this.countCoin *= x;
      },
      from: this.countCoin,
      to: countMoney || this.countCoin * x,
      duration,
      onUpdate: (tween) => {
        this.coinText.text = this.numberWithCommas(
          Math.floor(tween.getValue())
        );
        if (tween.getValue() > 90000000) {
          this.coinText.setFontSize(58);
        }
        if (tween.getValue() > 9000000000) {
          this.coinText.setFontSize(46);
          this.coinText.setOrigin(0.4, 0.5);
        }
      },
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  addCoins() {
    // this.scene.crySound = Utils.addAudio(this.scene, "cry", 0.5, true);
    const tear = this.scene.add
      .sprite(-210, 0, "atlas", "coin1s")
      .setDepth(145)
      .setScale(0.7);
    this.scene.anims.create({
      key: "cry",
      frames: this.scene.anims.generateFrameNames("atlas", {
        prefix: "coin",
        start: 1,
        end: 20,
      }),
      frameRates: 10,
      repeat: -1,
    });

    this.add([tear]);
    this._sort();
    this.animationCry = tear.play("cry");
  }

  changeSpeedCoin(speed) {
    this.animationCry.anims.msPerFrame = speed;
  }
  showBonus() {
    this.scene.tweens.add({
      targets: [this.bonus, this.scratch, this.bonus_card, this.scratch],
      scale: 1,
      alpha: 1,
      duration: 200,
      ease: "Sign.out",
      onComplete: () => this.addScratch(),
    });
    this.scene.tweens.add({
      targets: this.light,
      scale: 1.5,
      alpha: 1,
      duration: 200,
      ease: "Sign.out",
    });
    this.scene.tweens.add({
      targets: this.light,
      angle: 360,
      alpha: 1,
      duration: 4000,
      repeat: -1,
      delay: 300,
      ease: "Sign.out",
    });
  }

  hide() {
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      alpha: 0,
      duration: 300,
      ease: "Sign.out",
    });
  }

  removeHand() {
    this.hand?.destroy();
    this.booster?.destroy();
  }
}
