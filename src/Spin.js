import { POSITIONS_SPIN, SPIN_ITEMS } from "./constants/Constants";

export default class Spin extends Phaser.GameObjects.Container {
  constructor(scene, options) {
    super(scene, 0, 0);
    this.options = options;
    this.addSpin();

    this.spinDuration = 50;
    this.status = "stop";
    this.addAnimationFire(this.items[1]);
    this.addAnimationFire(this.items[2]);
    this.addAnimationFire(this.items[3]);
  }

  addSpin(option) {
    this.items = [];
    SPIN_ITEMS.slice(0, 5).map(({ name }, index) => {
      this[name] = this.scene.add
        .image(
          0,
          -310 + index * 125,
          "atlas",
          SPIN_ITEMS[(Math.random() * 7) | 0].name
        )
        .setAlpha(1)
        .setScale(0.4)
        .setDepth(200);
      this.items.push(this[name]);
      this.add([this[name]]);
      this._sort();
    });
  }

  win() {
    this.scene.tweens.add({
      targets: this.items[1],
      scale: "*=1.1",
      angle: "+=10",
      duration: 500,
      repeat: 3,
      yoyo: true,
      ease: "Ease.bounce",
      onComplete: () => {
        // this.scene.emitter.emit("bonus");
      },
    });
  }
  move(once) {
    this.items.map((item, index) => {
      this.scene.tweens.add({
        targets: item,
        y: item.y + 125,
        duration: this.spinDuration,
        ease: "Ease.bounce",
        onComplete: () => {
          // first spin
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.scene.machine.left.items[1].frame.name === "slot4" &&
              this.scene.machine.center.items[1].frame.name === "slot2" &&
              this.scene.machine.right.items[1].frame.name === "slot5" &&
              this.scene.step === 1)
          ) {
            return;
          }
          // second spin
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.items[1].frame.name === "slot1" &&
              this.scene.step === 2)
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.items[1].frame.name === "slot5" &&
              this.scene.step === 3)
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.items[1].frame.name === "slot2" &&
              this.scene.step === 4)
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.items[1].frame.name === "slot4" &&
              this.scene.step === 5)
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" &&
              this.scene.step === 3 &&
              this.items[1].frame.name === "slot_777")
          ) {
            return;
          }
          if (
            index !== 4 ||
            (this.status === "stop" && this.scene.step === 9)
          ) {
            this.items[4].y = -310;
            this.items[4].setTexture("atlas", SPIN_ITEMS[1].name);
            const lastItem = this.items.pop();
            this.items.unshift(lastItem);
            this.move();
            return;
          }
          this.items[4].y = -310;
          this.items[4].setTexture(
            "atlas",
            SPIN_ITEMS[(Math.random() * 7) | 0].name
          );
          const lastItem = this.items.pop();
          this.items.unshift(lastItem);
          this.move();
        },
      });
    });
  }

  stop() {
    this.spinDuration = 300;
    this.status = "stop";
    if (this.scene.step === 1) {
      this.scene.machine.left.items[0].setTexture("atlas", "slot4");
      this.scene.machine.center.items[0].setTexture("atlas", "slot2");
      this.scene.machine.right.items[0].setTexture("atlas", "slot5");
    }
    if (this.scene.step === 2) {
      this.items[0].setTexture("atlas", "slot1");
    }
    if (this.scene.step === 3) {
      this.items[0].setTexture("atlas", "slot5");
    }
    if (this.scene.step === 4) {
      this.items[0].setTexture("atlas", "slot2");
    }
    if (this.scene.step === 5) {
      this.items[0].setTexture("atlas", "slot4");
    }
  }

  addAnimationFire(item) {
    this.items.slice(1, 4).map((item, idx) => {
      // if (idx) return;
      // this.starsExplosion(item, idx);
      // const emitZone1 = {
      //   type: "edge",
      //   source: item
      //     .getBounds()
      //     .setSize(200, 135)
      //     .setPosition(item.getBounds().x - 33, item.getBounds().y),
      //   quantity: 42,
      //   total: 1,
      // };
      // this[`emitter${idx}`] = this.scene.add
      //   .particles(0, 0, "fire2", {
      //     speed: 1,
      //     lifespan: 900,
      //     quantity: 1,
      //     scale: { start: 0.2, end: 0 },
      //     emitZone: emitZone1,
      //     color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
      //     //   colorEase: "quad.out",
      //     blend: "ADD",
      //   })
      //   .setAlpha(0)
      //   .setDepth(200);
      // this.add(this[`emitter${idx}`]);
      // this._sort();
      // this[`emitter${idx}`].start(2000);

      const particles = this.scene.add.particles("fire2").setDepth(200);
      const emitZone = {
        type: "edge",
        source: item
          .getBounds()
          .setSize(200, 135)
          .setPosition(item.getBounds().x - 33, item.getBounds().y),
        quantity: 52,
        total: 20,
      };
      this[`emitter${idx}`] = particles.createEmitter({
        speed: 20,
        lifespan: 300,
        quantity: 2,
        scale: { start: 0.15, end: 0 },
        emitZone: emitZone,
        alpha: { start: 1, end: 0 },
        tint: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        duration: 2000,
      });
      this.add([particles]);
      this._sort();
      this[`emitter${idx}`].stop();
    });
  }
  starsExplosion(item, idx) {
    console.log("Phaser", Phaser);
    const particles = this.scene.add.particles("fire2").setDepth(200);
    const emitZone = {
      type: "edge",
      source: item
        .getBounds()
        .setSize(200, 135)
        .setPosition(item.getBounds().x - 33, item.getBounds().y),
      quantity: 42,
      total: 1,
    };
    const emitter = particles.createEmitter({
      speed: 1,
      lifespan: 900,
      quantity: 42,
      scale: { start: 0.2, end: 0 },
      emitZone: emitZone,
      alpha: { start: 1, end: 0 },
      tint: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
    });
    particles.setDepth(200);
    this.add([particles]);
    this._sort();
    emitter.start();
  }
}
