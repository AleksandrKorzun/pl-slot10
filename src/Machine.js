import Utils from "@holywater-tech/ads-builder/framework/Utils";
import CoinBox from "./CoinBox2";
import Spin from "./Spin";
import {
  POSITIONS,
  POSITIONS_SPIN1,
  POSITIONS_SPIN2,
  POSITIONS_SPIN3,
  SCALES,
  SPIN_ITEMS,
} from "./constants/Constants";
import GeometryMask from "@holywater-tech/ads-builder/framework/components/GeometryMask";

export default class Machine extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(
        POSITIONS.board[0],
        POSITIONS.board[1],
        POSITIONS.board[2],
        POSITIONS.board[3]
      )
      .setCustomScale(...SCALES.board)
      .setCustomAlign("Bottom")
      .setDepth(25)
      .setAlpha(1);
    this.isPortrait = this.scene.game.size.isPortrait;
    this.stopSpins = false;
    this.addMachine();
    this.addHandle();
    this.addLight();

    this.initListeners();
    // this.addBalance();
    this.addSpin({
      name: "left",
      x: -100,
      y: 80,
      maskX: 0,
      maskY: 600,
    });
    this.addSpin({ name: "center", x: 0, y: 80 });
    this.addSpin({ name: "right", x: 100, y: 80 });
    this.addHand();
    // this.scene.scale.on("resize", this.onResize, this);
  }
  initListeners() {
    this.scene.emitter.on("spin", () => this.spin(), this);
    this.scene.emitter.on("bonus", () => this.moveSpinner(), this);
  }

  spin() {
    this.removeHide();
    this.start();
  }
  addInteractive() {
    this.handle.setInteractive().once("pointerdown", this.onHandleClick, this);
  }

  addSpin(options) {
    this[options.name] = new Spin(this.scene)
      .setPosition(options.x, options.y)
      .setScale(0.6)
      .setDepth(6);

    this.add([this[options.name]]);
    this._sort();
  }

  addBalance() {
    this.win = this.scene.add
      .text(0, 145, "150000", {
        font: "bold 15px Arial",
        fill: "#fff",
        align: "center",
      })
      .setDepth(16);
    this.balance = this.scene.add
      .text(110, 145, "450000", {
        font: "bold 15px Arial",
        fill: "#fff",
        align: "center",
      })
      .setDepth(16);
    this.add([this.balance, this.win]);
    this._sort();
  }
  changeBalance(win, coins) {
    this.scene.tweens.add({
      targets: [this.balance, win],
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: 3,
    });
    const balance = parseInt(this.balance.text);
    this.animationSecond = this.scene.tweens.addCounter({
      from: this.scene.step === 2 ? 0 : balance,
      to: coins,
      duration: 2000,
      onUpdate: (tween) => {
        const currentValue = Math.floor(tween.getValue());
        this.balance.setText(currentValue);
      },
    });
    setTimeout(() => {
      // this.balance.setText(coins);
      this.win.setText(win);
    }, 1000);
  }
  addMachine() {
    this.machine = this.scene.add
      .image(0, 0, "machine")
      .setScale(1.2)
      .setDepth(10);
    this.btn_play = this.scene.add
      .image(130, 175, "atlas", "spin_btn")
      .setScale(0.65)
      .setDepth(10);
    this.btn_download = this.scene.add
      .image(-130, 175, "atlas", "download_btn")
      .setScale(0.65)
      .setDepth(10);
    this.table = this.scene.add
      .image(0, 40, "spin_base")
      .setScale(0.365)
      .setDepth(6);
    this.spin_hide1 = this.scene.add
      .image(100, 40, "spin_hide")
      .setScale(0.72)
      .setAlpha(1)
      .setDepth(7)
      .setSize(300, 300);
    this.spin_hide2 = this.scene.add
      .image(0, 40, "spin_hide")
      .setScale(0.72)
      .setAlpha(1)
      .setDepth(7)
      .setSize(300, 300);
    this.spin_hide3 = this.scene.add
      .image(-100, 40, "spin_hide")
      .setScale(0.72)
      .setAlpha(1)
      .setDepth(7)
      .setSize(300, 300);

    this.payline = this.scene.add
      .image(0, 43, "payline")
      .setScale(0.6)
      .setAlpha(1)
      .setDepth(15);
    this.head = this.scene.add
      .image(0, -370, "head")
      .setScale(0.6)
      .setAlpha(1)
      .setDepth(15);

    this.add([
      this.machine,
      this.table,
      this.spin_hide1,
      this.spin_hide2,
      this.spin_hide3,
      this.head,
      this.btn_play,
      this.btn_download,
      this.payline,
    ]);
    this._sort();

    this.btn_play.setInteractive().once("pointerdown", () => {
      this.scene.emitter.emit("spin");
      this.removeHand();
    });
    this.btn_download.setInteractive().on("pointerdown", () => {
      this.scene.openStore();
    });
  }
  addInteractiveBtnSpin() {
    this.btn_play.setInteractive().once("pointerdown", () => {
      this.scene.emitter.emit("spin");
      this.removeHand();
    });
  }
  addHandle() {
    this.handle = this.scene.add
      .image(220, 120, "atlas", "handle")
      .setScale(0.7)
      .setDepth(5);
    this.handle_press = this.scene.add
      .image(220, 220, "atlas", "handle_press")
      .setScale(0.7)
      .setAlpha(0)
      .setDepth(5);
    this.add([this.handle, this.handle_press]);
    this._sort();
  }

  addLight() {
    this.light_left = this.scene.add
      .image(-200, -75, "light_machine")
      .setScale(0.65)
      .setDepth(20);
    this.light_right = this.scene.add
      .image(200, -75, "light_machine")
      .setScale(0.65)
      .setFlipX(true)
      .setDepth(20);
    this.scene.tweens.add({
      targets: [this.light_left, this.light_right],
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
    this.add([this.light_left, this.light_right]);
    this._sort();
  }
  addHide() {
    this.hideBg = this.scene.add
      .image(0, 0, "bg_hide")
      .setScale(1)
      .setAlpha(0.6)
      .setDepth(50);
    this.add([this.hideBg]);
    this._sort();
  }
  removeHide() {
    this.hideBg?.destroy();
  }
  addHand() {
    if (this.left.status === "start") return;
    this.hands = this.scene.add
      .image(180, 90, "atlas", "tutorial_hand")
      .setScale(0.74)
      .setAlpha(1)
      .setDepth(55);
    this.add([this.hands]);
    this._sort();
    this.handleAnim = this.scene.tweens.add({
      targets: this.hands,
      angle: "+=5",
      y: "+=30",
      scale: "/=1.1",
      duration: 400,
      yoyo: true,
      repeat: -1,
    });
  }

  removeHand() {
    this.handleAnim?.remove();
    this.hands?.destroy();
  }
  addArows() {
    this.arrows2 = this.scene.add
      .image(-150, 400, "arrows")
      .setScale(1)
      .setDepth(30);
    this.arrows3 = this.scene.add
      .image(0, 400, "arrows")
      .setScale(1)
      .setDepth(30);
    this.arrows4 = this.scene.add
      .image(150, 400, "arrows")
      .setScale(1)
      .setDepth(30);
    this.scene.tweens.add({
      targets: [this.arrows2, this.arrows3, this.arrows4],
      y: "-=3000",
      duration: 1500,
      onComplete: () => {
        this.arrows2.destroy();
        this.arrows3.destroy();
        this.arrows4.destroy();
      },
    });
    this.add([this.arrows2, this.arrows3, this.arrows4]);
    this._sort();
  }

  moveSpinner() {
    this.addArows();

    this.spinner3.destroy();
    const timeline = this.scene.tweens.createTimeline();

    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 800,
      ease: "Ease.inOut",
    });
    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 900,
      ease: "Ease.inOut",
    });
    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 1000,
      ease: "Ease.inOut",
    });

    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 1100,
      ease: "Ease.in",
    });

    timeline.add({
      targets: this.spinner2,
      angle: 95,
      duration: 700,
    });
    timeline.add({
      targets: this.spinner2,
      angle: 85,
      duration: 1000,
      onComplete: () => this.animationCoinBox(),
    });

    setTimeout(() => {
      timeline.play();
    }, 1500);
  }
  start() {
    this.reel = Utils.addAudio(this.scene, "reel", 0.5, false);
    if (this.scene.step === 4) {
      this.scene.step = 5;
    }
    if (this.scene.step === 3) {
      this.scene.step = 4;
    }
    if (this.scene.step === 2) {
      this.scene.step = 3;
    }
    if (this.scene.step === 1) {
      this.scene.step = 2;
    }
    if (this.scene.step === 0) {
      this.scene.step = 1;
    }
    this.left.status = "start";
    this.center.status = "start";
    this.right.status = "start";
    this.left.spinDuration = 50;
    this.left.move();
    setTimeout(() => {
      this.center.spinDuration = 50;
      this.center.move();
    }, 50);
    setTimeout(() => {
      this.right.spinDuration = 50;
      this.right.move();
    }, 100);
    setTimeout(() => {
      this.stop();
    }, 2000);
    // this.removeAnimationFire();
  }

  stop() {
    // this.btn.disableInteractive();
    this.left.stop();
    setTimeout(() => {
      this.center.stop();
    }, 500);
    setTimeout(() => {
      this.right.stop();
    }, 800);
    setTimeout(() => {
      this.reel.stop();
      // this.addAnimationFire();
    }, 2000);
    setTimeout(() => {
      this.addInteractiveBtnSpin();
      if (this.scene.step === 1) {
        this.addHand();
      } else {
        Utils.addAudio(this.scene, "win2", 0.5, false);
        this.left.win();
        this.center.win();
        this.right.win();
        // this.changeBalance(150000, 450000);
      }
      if (this.scene.step === 2) {
        this.scene.win.addBigWin();
        this.addBalance();
        this.changeBalance(150000, 450000);
      }
      if (this.scene.step === 3) {
        this.scene.addWin();
        this.scene.win.addBigWin();
        // this.addBalance();
        this.changeBalance(250000, 700000);
      }
      if (this.scene.step === 4) {
        this.scene.addWin();
        this.scene.win.addMegaWin();
        this.changeBalance(400000, 1100000);
      }
      if (this.scene.step === 5) {
        this.scene.addWin();
        this.scene.win.addJackpot();
        setTimeout(() => {
          this.scene.emitter.emit("final");
        }, 2000);
      }
    }, 3000);
    setTimeout(() => {
      // if (this.scene.step === 2) {
      //   this.scene.emitter.emit("bonus");
      // }
      // if (this.scene.step === 1) {
      //   this.scene.emitter.emit("second_spin");
      // }
    }, 6000);
  }

  animationCoinBox() {
    const tear = this.scene.add
      .sprite(0, -560, "atlas", "fire1")
      .setDepth(2)
      .setScale(2.2);
    this.scene.anims.create({
      key: "cry",
      frames: this.scene.anims.generateFrameNames("atlas", {
        prefix: "fire",
        start: 1,
        end: 10,
      }),
      frameRates: 10,
      repeat: 4,
    });
    setTimeout(() => {
      this.scene.emitter.emit("final");

      tear.destroy();
    }, 2000);
    this.add([tear]);
    this._sort();
    this.animationCry = tear.play("cry");
  }
}
