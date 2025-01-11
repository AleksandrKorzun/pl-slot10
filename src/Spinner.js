import { POSITIONS } from "./constants/Constants";

export default class Spinner extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.addSpinner();
    this.addStyles();
    // this.light();
    // this.moveArrow();

    // this.moveSpinner();
    this.addHand();
    this.addBtn();
    // setInterval(() => {
    //   this.moveSpinner();
    // }, 8000);
  }

  addStyles() {
    this.addProperties(["pos", "scale", "align"])
      // .setCustomPosition(...POSITIONS.spinner)
      .setCustomPosition(0, 1700, 0, 1700)
      .setCustomScale(1, 1, 0.8, 0.8)
      .setCustomAlign("Center")
      .setDepth(7)
      .setAlpha(1);
  }

  addSpinner() {
    this.spinnerBase = this.scene.add
      .image(0, 0, "spin2_base")
      .setScale(0.9)
      .setDepth(1);
    this.spinnerA = this.scene.add
      .image(0, 0, "spin2")
      .setScale(0.9)
      .setOrigin(0.51, 0.49)
      .setDepth(3);
    this.spinnerC = this.scene.add
      .image(0, -400, "spin2_arrow")
      .setScale(0.8)
      .setOrigin(0.5, 0)
      .setDepth(15);
    this.spinner = this.scene.add.image(0, 0, "spin2_center").setDepth(4);
    this.spinnerL = this.scene.add
      .image(0, 520, "spin2_p")
      .setScale(0.81)
      .setAlpha(1)
      .setDepth(10);

    this.add([
      this.spinnerBase,
      this.spinner,
      this.spinnerL,
      this.spinnerA,
      this.spinnerC,
    ]);
    this._sort();
  }
  addBtn() {
    this.btn_press = this.scene.add
      .image(0, 380, "spin2_btn_press")
      .setScale(1)
      .setAlpha(1)
      .setDepth(10);
    this.btn = this.scene.add
      .image(0, 370, "atlas", "spin_btn")
      .setScale(1)
      .setAlpha(1)
      .setDepth(11);
    this.add([this.btn, this.btn_press]);
    this._sort();
    this.btn.setInteractive().on("pointerdown", () => {
      this.btnClick();
      this.handAnim?.remove();
      this.hand.destroy();
      this.moveSpinner();
    });
  }
  btnClick() {
    this.scene.tweens.add({
      targets: this.btn,
      alpha: 0,
      duration: 200,
      hold: 500,
      yoyo: true,
    });
  }
  addHand() {
    this.hand = this.scene.add
      .image(50, 160, "atlas", "hand")
      .setAngle(-30)
      .setDepth(22);
    this.add(this.hand);
    this._sort();
    this.handAnim = this.scene.tweens.add({
      targets: this.hand,
      y: 220,
      duration: 300,
      hold: 200,
      yoyo: true,
      repeat: -1,
    });
  }
  light() {
    this.lightAnim = this.scene.tweens.add({
      targets: this.spinnerL,
      alpha: 1,
      duration: 100,
      yoyo: true,
      repeat: -1,
    });
  }
  moveArrow() {
    this.moveAnim = this.scene.tweens.add({
      targets: this.spinnerC,
      //   onStart: () => this.spinnerC.setAngle(-25),
      //   onStart: () => this.spinnerC.setAngle(0),
      angle: -35,
      duration: 100,
      yoyo: true,
      repeat: -1,
    });
  }
  spin() {
    this.scene.tweens.add({
      targets: this.spinnerA,
      onStart: () => {
        this.moveArrow();
        this.lightAnim?.remove();
        this.spinnerL.setAlpha(0);
      },
      onComplete: () => {
        this.light();
        this.moveAnim?.remove();
        this.spinnerC.setAngle(0);
      },
      angle: 360,
      duration: 1000,
      //   yoyo: true,
      repeat: 3,
    });
  }
  moveSpinner() {
    // this.addArows();

    // this.spinner3.destroy();
    const timeline = this.scene.tweens.createTimeline();

    timeline.add({
      targets: this.spinnerA,
      angle: 360,
      duration: 800,
      ease: "Ease.inOut",
    });
    timeline.add({
      targets: this.spinnerA,
      angle: 360,
      duration: 900,
      ease: "Ease.inOut",
    });
    timeline.add({
      targets: this.spinnerA,
      angle: 360,
      duration: 1000,
      ease: "Ease.inOut",
    });

    timeline.add({
      targets: this.spinnerA,
      angle: 360,
      duration: 1100,
      ease: "Ease.in",
    });

    timeline.add({
      targets: this.spinnerA,
      angle: 35,
      duration: 700,
    });
    timeline.add({
      targets: this.spinnerA,
      angle: 25,
      duration: 1000,
      onComplete: () => this.animationFree(),
    });

    setTimeout(() => {
      timeline.play();
    }, 500);
  }
  show() {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      alpha: 1,
      duration: 300,
      ease: "Sign.out",
    });
  }
  animationFree() {
    this.free = this.scene.add
      .image(0, -70, "free")
      .setAlpha(0)
      .setScale(0)
      .setDepth(15);
    this.spinns = this.scene.add
      .image(0, 70, "spinns")
      .setAlpha(0)
      .setScale(0)
      .setDepth(15);
    this.lights = this.scene.add
      .image(0, 0, "light")
      .setAlpha(0)
      .setScale(0)
      .setDepth(14);
    this.add([this.free, this.spinns, this.lights]);
    this._sort();
    this.scene.tweens.add({
      targets: [this.free, this.spinns, this.lights],
      scale: 1,
      alpha: 1,
      duration: 500,
      yoyo: true,
      hold: 3500,
    });
    this.scene.tweens.add({
      targets: this.lights,
      angle: 360,
      duration: 1000,
      repeat: 3,
      delay: 500,
      onComplete: () => {
        this.lights.destroy();
        this.scene.emitter.emit("machine");
      },
    });
  }
}
