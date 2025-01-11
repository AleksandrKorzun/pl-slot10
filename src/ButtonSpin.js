import { SPIN_ITEMS } from "./constants/Constants";
import Machine from "./Machine";

export default class ButtonSpin extends Phaser.GameObjects.Container {
  constructor(scene, options) {
    super(scene, 0, 0);
    this.addButton();
    this.addStyles();
    this.scene.emitter.on("second_spin", () => this.addTutorial());
  }
  addStyles() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, -70, 0, -70)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomAlign("Bottom")
      .setDepth(70)
      .setAlpha(1);
  }
  addButton() {
    this.buttonGreen = this.scene.add
      .image(0, 0, "atlas", "spin_green")
      .setDepth(8)
      .setInteractive()
      .once("pointerdown", () => this.onClick());
    this.buttonRed = this.scene.add
      .image(-2, 0, "atlas", "spin_red")
      .setAlpha(0)
      .setDepth(9);
    this.arrow = this.scene.add
      .image(0, -210, "atlas", "arrow")
      .setScale(0.7)
      .setAlpha(1)
      .setDepth(8);
    this.arrowAnim = this.scene.tweens.add({
      targets: this.arrow,
      y: -170,
      duration: 400,
      yoyo: true,
      hold: 100,
      repeat: -1,
      easy: "Easy.inOut",
    });
    this.add([this.buttonGreen, this.buttonRed, this.arrow]);
    this._sort();
  }
  addTutorial() {
    this.buttonGreen.setInteractive().once("pointerdown", () => this.onClick());
    this.buttonGreen.setAlpha(1);
    this.buttonRed.setAlpha(0);
    this.arrow.setAlpha(1);

    this.arrowAnim = this.scene.tweens.add({
      targets: this.arrow,
      y: -170,
      duration: 400,
      yoyo: true,
      hold: 100,
      repeat: -1,
      easy: "Easy.inOut",
    });
    this.add([this.arrow]);
    this._sort();
  }
  onClick() {
    this.arrowAnim.remove();
    this.arrow.setAlpha(0);

    this.scene.emitter.emit("spin");
    this.scene.tweens.add({
      targets: this.buttonGreen,
      alpha: 0,
      duration: 200,
      easy: "Easy.out",
    });
    this.scene.tweens.add({
      targets: this.buttonRed,
      alpha: 1,
      duration: 200,
      easy: "Easy.in",
    });
  }
}
