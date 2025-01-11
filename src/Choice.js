export default class Choice extends Phaser.GameObjects.Container {
  constructor(scene, options) {
    super(scene, 0, 0);
    this.options = options;
    this.addChoice();
  }

  addChoice() {
    this.choice_base1 = this.scene.add
      .image(0, 0, "choice_base")
      .setDepth(2)
      .setScale(1)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.choice_t1 = this.scene.add
      .image(0, -110, "atlas", this.options.choice)
      .setDepth(3)
      .setScale(1)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.choice_t2 = this.scene.add
      .image(0, 0, "atlas", this.options.text)
      .setDepth(3)
      .setScale(1)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.choice_base1
      .setInteractive()
      .once("pointerdown", () => this.onclick());
    this.add([this.choice_base1, this.choice_t1, this.choice_t2]);
    this._sort();
  }
  onclick() {
    this.scene.emitter.emit(this.options.event);
  }
}
