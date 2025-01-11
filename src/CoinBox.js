import Screen from "./Screen";
import { BET, EVENTS, POSITIONS, SCALES } from "./constants/Constants";
// import { POSITIONS, SCALES } from "./constants/Constants";

export default class CoinBox extends Phaser.GameObjects.Container {
  constructor(scene, count) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.countCoin = count || 100000000;
    this.addCoinBox(612343900123, "box4", "grand", { x: -40, y: -130 });
    this.addCoinBox(51092039929, "box3", "major", { x: -60, y: 80 });
    this.addCoinBox(4133215435, "box2", "minor", { x: -90, y: 260 });
    this.addCoinBox(132045378, "box1", "mini", { x: -110, y: 420 });
    this.changeCount(132045378, 632045378, this.mini_text, 100000000);
    this.changeCount(4133215435, 932045378, this.minor_text, 500000000);
    this.changeCount(51092039929, 91092039929, this.major_text, 100000000);
    this.changeCount(612343900123, 912343900123, this.grand_text, 200000000);
    this.addStyles();

    // this.initListeners();
  }

  addStyles() {
    this.addProperties(["pos", "scale", "align"])
      .setCustomPosition(...POSITIONS.coins)
      .setCustomScale(0.8, 0.8, 0.5, 0.5)
      .setCustomAlign("Left", "Top")
      .setDepth(7)
      .setAlpha(1);
  }
  addCoinBox(coins, box, name, pos) {
    // { coins, box, name, pos }
    // this.countCoin = 4832;
    this[name] = this.scene.add
      .image(pos.x, pos.y, "atlas", box)
      .setDepth(54)
      .setScale(1.5)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this[`${name}_s`] = this.scene.add
      .image(pos.x, pos.y - 80, "atlas", name)
      .setDepth(54)
      .setScale(2, 1.7)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    const posText = {
      grand: { x: 0, y: 25 },
      mini: { x: 0, y: 0 },
      major: { x: 0, y: 0 },
      minor: { x: 0, y: 0 },
    };
    const offsetX = posText[name].x;
    const offsetY = posText[name].y;
    this[`${name}_text`] = this.scene.add
      .text(pos.x + offsetX, pos.y + offsetY, this.numberWithCommas(coins), {
        font: `bold 60px BerlinSansFBDemiBold`,
        fill: "#F9E90F",
        shadow: {
          offsetX: 5,
          offsetY: 5,
          color: "#000",
          blur: 10,
          stroke: true,
          fill: true,
        },
        letterSpacing: 10,
        stroke: "#000",
        strokeThickness: 10,
      })
      .setDepth(120)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.add([this[name], this[`${name}_text`], this[`${name}_s`]]);
    this._sort();
  }

  changeCount(coins, to, textObj, duration) {
    // const coinBet = Object.values(BET[this.scene.footer.text_bet])[0];
    this.animationSecond = this.scene.tweens.addCounter({
      from: coins,
      to: to,
      duration,
      onUpdate: (tween) => {
        const currentValue = Math.floor(tween.getValue());
        textObj.setText(this.numberWithCommas(currentValue));
      },
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
