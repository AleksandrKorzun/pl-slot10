export default class Win extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.isHorizontal = window.innerWidth > window.innerHeight;
    // this.addMegaWin();
    // this.addJackpot();
    this.initAssets();
  }

  initAssets() {
    this.addProperties(["pos"])
      .setCustomPosition(0, -100, 0, -100)
      .setScale(1)
      .setCustomAlign("Center")
      .setDepth(35);
  }

  addBigWin() {
    this.big = this.scene.add
      .image(0, 0, "big_yellow")
      .setDepth(5)
      .setOrigin(0.5, 1)
      .setScale(1)
      .setPosition(0, 20);
    this.win = this.scene.add
      .image(0, 0, "win_yellow")
      .setDepth(6)
      .setOrigin(0.5, 0)
      .setPosition(0, 0);
    this.star1 = this.scene.add
      .image(0, 0, "star_yellow1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setFlipY(true)
      .setPosition(-120, -20);
    this.star2 = this.scene.add
      .image(0, 0, "star_yellow1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setFlipY(true)
      .setPosition(-160, 40);
    this.star3 = this.scene.add
      .image(0, 0, "star_yellow1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setFlipY(true)
      .setPosition(-160, 100);
    this.star4 = this.scene.add
      .image(0, 0, "star_yellow1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setFlip(true)
      .setFlipY(true)
      .setPosition(120, -20);
    this.star5 = this.scene.add
      .image(0, 0, "star_yellow1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setFlipX(true)
      .setFlipY(true)
      .setPosition(160, 40);
    this.star6 = this.scene.add
      .image(0, 0, "star_yellow1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setFlip(true)
      .setFlipY(true)
      .setPosition(160, 100);
    this.stars = [
      this.star1,
      this.star2,
      this.star3,
      this.star4,
      this.star5,
      this.star6,
    ];
    this.stars.map((star, index) => {
      this.scene.tweens.add({
        targets: star,
        scale: "*=1.1",
        duration: 400,
        delay: index * 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        repeat: 5,
      });
    });
    this.scene.tweens.add({
      targets: this.big,
      scale: "*=1.1",
      duration: 400,
      delay: 0,
      yoyo: true,
      ease: "Sine.easeInOut",
      repeat: 5,
    });
    this.scene.tweens.add({
      targets: this.win,
      scale: "*=1.1",
      duration: 400,
      delay: 200,
      yoyo: true,
      ease: "Sine.easeInOut",
      repeat: 5,
    });
    this.add([
      this.big,
      this.win,
      this.star1,
      this.star2,
      this.star3,
      this.star4,
      this.star5,
      this.star6,
    ]);
    this._sort();
    this.show();
    return this;
  }

  addMegaWin() {
    this.big = this.scene.add
      .image(0, 0, "mega")
      .setDepth(5)
      .setOrigin(0.5, 1)
      .setScale(0.7)
      .setPosition(0, 20);
    this.win = this.scene.add
      .image(0, 0, "win_blue")
      .setDepth(6)
      .setScale(0.7)
      .setOrigin(0.5, 0)
      .setPosition(0, 0);
    this.star1 = this.scene.add
      .image(0, 0, "star_blue1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setFlipY(true)
      .setPosition(-120, -20);
    this.star2 = this.scene.add
      .image(0, 0, "star_blue1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setFlipY(true)
      .setPosition(-160, 40);
    this.star3 = this.scene.add
      .image(0, 0, "star_blue1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setFlipY(true)
      .setPosition(-160, 100);
    this.star4 = this.scene.add
      .image(0, 0, "star_blue1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setFlip(true)
      .setFlipY(true)
      .setPosition(120, -20);
    this.star5 = this.scene.add
      .image(0, 0, "star_blue1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setFlipX(true)
      .setFlipY(true)
      .setPosition(160, 40);
    this.star6 = this.scene.add
      .image(0, 0, "star_blue1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setScale(0.5)
      .setFlip(true)
      .setFlipY(true)
      .setPosition(160, 100);
    this.stars = [
      this.star1,
      this.star2,
      this.star3,
      this.star4,
      this.star5,
      this.star6,
    ];
    this.stars.map((star, index) => {
      this.scene.tweens.add({
        targets: star,
        scale: "*=1.1",
        duration: 400,
        delay: index * 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        repeat: 5,
      });
    });
    this.scene.tweens.add({
      targets: this.big,
      scale: "*=1.1",
      duration: 400,
      delay: 0,
      yoyo: true,
      ease: "Sine.easeInOut",
      repeat: 5,
    });
    this.scene.tweens.add({
      targets: this.win,
      scale: "*=1.1",
      duration: 400,
      delay: 200,
      yoyo: true,
      ease: "Sine.easeInOut",
      repeat: 5,
    });
    this.add([
      this.big,
      this.win,
      this.star1,
      this.star2,
      this.star3,
      this.star4,
      this.star5,
      this.star6,
    ]);
    this._sort();
    this.show();
    return this;
  }
  addJackpot() {
    this.jack = this.scene.add
      .image(0, 0, "jackpot")
      .setDepth(5)
      .setOrigin(0.5, 1)
      .setScale(0.7)
      .setPosition(0, 20);

    this.star1 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setAngle(110)
      .setScale(0.9)
      .setFlipY(true)
      .setPosition(0, -110);
    this.star3 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setAngle(90)
      .setScale(0.8)
      .setFlipY(true)
      .setPosition(-75, -90);
    this.star2 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setAngle(120)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setFlipY(true)
      .setPosition(75, -90);
    this.star4 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setAngle(120)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setFlipY(true)
      .setPosition(150, -70);
    this.star5 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setAngle(90)
      .setScale(0.7)
      .setFlipY(true)
      .setPosition(-150, -70);
    this.star6 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setAngle(105)
      .setScale(0.9)
      //   .setFlipY(true)
      .setFlipX(true)
      .setPosition(0, 40);
    this.star7 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setAngle(120)
      .setScale(0.8)
      .setFlipX(true)
      .setPosition(-75, 20);
    this.star8 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setAngle(100)
      .setOrigin(0.5, 0.5)
      .setScale(0.8)
      .setFlipX(true)
      .setPosition(75, 10);
    this.star9 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setAngle(90)
      .setOrigin(0.5, 0.5)
      .setScale(0.7)
      .setFlipX(true)
      .setPosition(150, 0);
    this.star10 = this.scene.add
      .image(0, 0, "star_red1")
      .setDepth(3)
      .setOrigin(0.5, 0.5)
      .setAngle(120)
      .setScale(0.7)
      .setFlipX(true)
      .setPosition(-150, 0);

    this.stars = [
      this.star1,
      this.star2,
      this.star3,
      this.star4,
      this.star5,
      this.star6,
      this.star7,
      this.star8,
      this.star9,
      this.star10,
    ];
    this.stars.map((star, index) => {
      this.scene.tweens.add({
        targets: star,
        scale: "*=1.1",
        duration: 400,
        delay: index * 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        repeat: 5,
      });
    });
    this.scene.tweens.add({
      targets: this.jack,
      scale: "*=1.1",
      duration: 400,
      delay: 0,
      yoyo: true,
      ease: "Sine.easeInOut",
      repeat: 5,
    });

    this.add([
      this.jack,
      //   this.win,
      this.star1,
      this.star2,
      this.star3,
      this.star4,
      this.star5,
      this.star6,
      this.star7,
      this.star8,
      this.star9,
      this.star10,
    ]);
    this._sort();
    this.show();
    return this;
  }
  show() {
    this.scene.add.tween({
      targets: this,
      scale: 1,
      duration: 400,
      ease: "Sine.easeInOut",
      onComplete: () => {
        setTimeout(() => {
          this.scene.add.tween({
            targets: this,
            scale: 0,
            duration: 400,
            ease: "Sine.easeInOut",
            onComplete: () => {
              this.destroy();
            },
          });
        }, 2000);
      },
    });
  }
}
