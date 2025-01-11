import Choice from "./Choice";

export default class Choices extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.addChoice();
    this.addStyles();
    this.addHand();
    this.scene.emitter.on("first_choice", () => {
      this.removeHand();
      this.clickChoice(this.choice1);
      this.hideChoice();
    });
    this.scene.emitter.on("second_choice", () => {
      this.removeHand();
      this.clickChoice(this.choice2);
      this.hideChoice();
    });
  }
  addStyles() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(0, -180, 0, -180)
      .setCustomScale(1, 1, 1, 1)
      .setCustomAlign("Bottom")
      .setDepth(70)
      .setAlpha(1);
  }
  addChoice() {
    this.choice1 = new Choice(this.scene, {
      choice: "free_spin",
      text: "2t",
      event: "first_choice",
    })
      .setScale(0.5)
      .setDepth(8)
      .setPosition(-130, 0);
    this.choice2 = new Choice(this.scene, {
      choice: "multiplayer",
      text: "2x",
      event: "second_choice",
    })
      .setScale(0.5)
      .setDepth(8)
      .setPosition(130, 0);
    this.add([this.choice1, this.choice2]);
    this._sort();
  }
  removeHand() {
    this.timelineHand.stop();
    this.hand.destroy();
  }
  hideChoice() {
    this.scene.tweens.add({
      targets: this.choice1,
      x: -1700,
      duration: 600,
      ease: "Power2",
      delay: 1000,
    });
    this.scene.tweens.add({
      targets: this.choice2,
      x: 1700,
      duration: 600,
      ease: "Power2",
      delay: 1000,
    });
  }
  clickChoice(choice) {
    this.scene.tweens.add({
      targets: choice,
      scale: "/=1.1",
      duration: 400,
      yoyo: true,
      ease: "Power2",
    });
  }
  addHand() {
    this.hand = this.scene.add
      .image(-100, 50, "atlas", "hand")
      .setScale(0.5)
      .setDepth(8)
      .setAngle(90)
      .setAlpha(1);
    this.add(this.hand);
    this._sort();
    this.timelineHand = this.scene.tweens.timeline({
      targets: this.hand,
      loop: -1,
      tweens: [
        {
          scale: 0.45,
          x: -110,
          y: 40,
          duration: 300,
          yoyo: true,
        },
        {
          x: 150,
          duration: 500,
        },
        {
          scale: 0.45,
          x: 140,
          y: 40,
          duration: 300,
          yoyo: true,
        },
        {
          x: -100,
          duration: 500,
          // yoyo: true,
          // repeat: -1,
        },
      ],
    });

    // this.timeline.play();
  }
}
