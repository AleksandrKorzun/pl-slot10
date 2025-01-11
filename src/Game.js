import ParentScene from "@holywater-tech/ads-builder/framework/components/Scene";
import Background from "@holywater-tech/ads-builder/framework/components/ui/Background";
import { EVENTS, POSITIONS, SLOT1 } from "./constants/Constants";
import Machine from "./Machine";
import ButtonSpin from "./ButtonSpin";
import Utils from "@holywater-tech/ads-builder/framework/Utils";
import Choices from "./Choices";
import Win from "./Win";
import Spinner from "./Spinner";

export default class Game extends ParentScene {
  create() {
    this.totalCoins = 100000000;
    this.step = 0;
    this.addBackground("bg1");
    // this.addBtnSpin();
    this.addCta();
    this.addMachine();
    this.addWin();
    // this.addSpinner();
    // this.final();
    Utils.addAudio(this, "music_trivia", 0.3, true);
    this.initListeners();
  }

  initListeners() {
    this.emitter.on("final", () => this.final(), this);
  }

  scaleMachine() {
    this.tweens.add({
      targets: this.machine,
      scale: "*=1.1",
      // py: "+=50",
      // ly: "+=50",
      duration: 500,
    });
  }

  addDragon() {
    this.dragon = this.add
      .image(0, 0, "phoenix")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 400, 0, 400)
      .setCustomScale(1, 1, 1, 1)
      .setCustomAlign("Top")
      .setDepth(5);
    this.mainContainer.add([this.dragon]);
    this.sort();
  }
  final() {
    this.bg1.setInteractive().on("pointerdown", () => this.openStore());
    this.bg_hide = this.add
      .image(0, 0, "bg_hide")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomScale(1, 1, 1, 1)
      .setAlpha(1)
      .setCustomAlign("Center")
      .setDepth(99);
    this.base = this.add
      .image(0, 0, "jackpot_base")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -130, 0, -130)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomAlign("Center")
      .setDepth(100);
    this.base2 = this.add
      .image(0, 0, "jackpot_base2")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -130, 0, -130)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomAlign("Center")
      .setDepth(105);
    this.base_blue = this.add
      .image(0, 0, "jackpot_light_blue")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -130, 0, -130)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomAlign("Center")
      .setAlpha(0)
      .setDepth(100);
    this.base_red = this.add
      .image(0, 0, "jackpot_light")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -130, 0, -130)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomAlign("Center")
      .setAlpha(0)
      .setDepth(100);
    this.jackpot = this.add
      .image(0, 0, "jackpot")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -130, 0, -130)
      .setCustomScale(0.8, 0.8, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(100);
    this.jackpot2 = this.add
      .image(0, 0, "jackpot_hide")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -140, 0, -141)
      .setCustomScale(0.8, 0.8, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(100);
    this.light = this.add
      .image(0, 0, "light_yellow")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -140, 0, -141)
      .setCustomScale(2.5, 2.5, 2.5, 2.5)
      .setCustomAlign("Center")
      .setDepth(99);

    this.collect = this.add
      .image(0, 0, "atlas", "btn_get")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 300, 0, 200)
      .setCustomScale(0.8, 0.8, 0.6, 0.6)
      .setCustomAlign("Center")
      .setAlpha(1)
      .setDepth(101);
    this.tweens.add({
      targets: this.jackpot2,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: this.light,
      angle: 360,
      duration: 1500,
      // yoyo: true,
      repeat: -1,
      // ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: this.base_red,
      alpha: 1,
      duration: 400,
      hold: 400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    setTimeout(() => {
      this.tweens.add({
        targets: this.base_blue,
        alpha: 1,
        duration: 400,
        hold: 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }, 600);
    this.tweens.add({
      targets: this.collect,
      scale: "*=1.1",
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.addCoins();
    setTimeout(() => {
      this.addCoinsAnim();
    }, 2000);
    this.mainContainer.add([
      this.base,
      this.base2,
      this.bg_hide,
      this.base_blue,
      this.base_red,
      this.jackpot,
      this.jackpot2,
      this.collect,
      this.light,
      // this.light_left,
      // this.light_right,
    ]);
    this.sort();
  }

  addCoins() {
    ["0", "0", "0", "0", "0", "0", "0"].forEach((item, index) => {
      const x = [-140, -80, -35, 10, 70, 115, 160][index];

      this[`num${index}`] = this.add
        .image(0, 0, "atlas", item)
        .addProperties(["pos", "scale"])
        .setCustomPosition(x, 70, x, 70)
        .setCustomScale(0.8, 0.8, 0.8, 0.8)
        .setCustomAlign("Center")
        .setDepth(105);
      this.mainContainer.add([this[`num${index}`]]);
      this.sort();
    });
    this.dote1 = this.add
      .image(0, 0, "atlas", "dote")
      .addProperties(["pos", "scale"])
      .setCustomPosition(-110, 95, -110, 95)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(105);
    this.dote2 = this.add
      .image(0, 0, "atlas", "dote")
      .addProperties(["pos", "scale"])
      .setCustomPosition(42, 95, 42, 95)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(105);
    this.coin_base = this.add
      .image(0, 0, "coin_base")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 70, 0, 70)
      .setCustomScale(0.65, 0.9, 0.65, 0.9)
      .setCustomAlign("Center")
      .setDepth(104);
    this.mainContainer.add([this.dote1, this.dote2, this.coin_base]);
    this.sort();
    Utils.addAudio(this, "win", 0.5, false);
    this.tweens.addCounter({
      from: 0,
      to: 999999,
      duration: 2000,
      onUpdate: (tween) => {
        // const currentValue = Math.floor(tween.getValue());
        const one1 = Math.floor(Math.random() * 9);
        const one2 = Math.floor(Math.random() * 9);
        const one3 = Math.floor(Math.random() * 9);
        const one4 = Math.floor(Math.random() * 9);
        const one5 = Math.floor(Math.random() * 9);
        const one6 = Math.floor(Math.random() * 9);
        this.num1.setTexture("atlas", `${one1}`);
        this.num2.setTexture("atlas", `${one2}`);
        this.num3.setTexture("atlas", `${one3}`);
        this.num4.setTexture("atlas", `${one4}`);
        this.num5.setTexture("atlas", `${one5}`);
        this.num6.setTexture("atlas", `${one6}`);
      },
      onComplete: () => {
        // this.num0.setTexture("atlas", "1");
        this.num1.setTexture("atlas", "0");
        this.num2.setTexture("atlas", "0");
        this.num3.setTexture("atlas", "0");
        this.num4.setTexture("atlas", "0");
        this.num5.setTexture("atlas", "0");
        this.num6.setTexture("atlas", "0");
      },
    });
    this.tweens.addCounter({
      from: 0,
      to: 11,
      duration: 2000,
      onComplete: () => {
        // this.num0.setTexture("atlas", `0`);
        this[`num9`] = this.add
          .image(0, 0, "atlas", "1")
          .addProperties(["pos", "scale"])
          .setCustomPosition(-180, 70, -180, 70)
          .setCustomScale(0.8, 0.8, 0.8, 0.8)
          .setCustomAlign("Center")
          .setDepth(105);
        this.mainContainer.add([this[`num9`]]);
        this.sort();
      },

      onUpdate: (tween) => {
        let currentValue = Math.floor(tween.getValue());
        currentValue = currentValue > 9 ? currentValue - 10 : currentValue;
        this.num0.setTexture("atlas", `${currentValue}`);
      },
    });
  }
  addCta() {
    this.cta = this.add
      .image(0, 0, "atlas", "download")
      .addProperties(["pos", "scale"])
      .setCustomPosition(150, 70, 150, 70)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Top Left")
      .setDepth(100)
      .setAlpha(1);
    this.logo = this.add
      .image(0, 0, "atlas", `icon2`)
      .addProperties(["pos", "scale"])
      .setCustomPosition(-80, 80, -80, 80)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Top Right")
      .setDepth(100)
      .setAlpha(1);
    this.cta.setInteractive().once("pointerdown", () => this.openStore());
    this.logo.setInteractive().once("pointerdown", () => this.openStore());
    this.mainContainer.add([this.cta, this.logo]);
    this.sort();
    this.tweens.add({
      targets: this.cta,
      scale: "*=1.1",
      yoyo: true,
      repeat: -1,
      duration: 300,
    });
  }
  addBackground(bg, options = {}) {
    this[bg] = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1])
      .setDepth(options.depth || 4)
      .setAlpha(1);

    this.mainContainer.add([this[bg]]);
    this.sort();
  }
  addBtnSpin() {
    this.btnSpin = new ButtonSpin(this).setAlpha(0);
    this.mainContainer.add([this.btnSpin]);
    this.sort();

    this.tweens.add({
      targets: this.btnSpin,
      alpha: 1,
      duration: 500,
      delay: 1000,
    });
  }
  addMachine() {
    this.machine = new Machine(this);
    this.mainContainer.add([this.machine]);
    this.tweens.add({
      targets: this.machine,
      py: POSITIONS.board[3],
      ly: POSITIONS.board[1],
      duration: 500,
      delay: 1000,
    });
    this.sort();
  }
  addChoices() {
    this.choices = new Choices(this);
    this.mainContainer.add([this.choices]);
    this.sort();
  }
  addWin() {
    this.win = new Win(this);
    this.mainContainer.add([this.win]);
    this.sort();
  }
  addSpinner() {
    this.spinner = new Spinner(this);
    this.mainContainer.add([this.spinner]);
    this.tweens.add({
      targets: this.spinner,
      py: 0,
      ly: 0,
      duration: 500,
      delay: 1000,
    });
    this.sort();
  }

  removespinner() {
    this.tweens.add({
      targets: this.spinner,
      px: 2000,
      lx: 2000,
      duration: 500,
      delay: 1000,
    });
  }
  addCoinsAnim() {
    this.partc = this.add
      .particles("atlas", "coins1")
      .addProperties(["pos"])
      .setCustomPosition(0, 70, 0, 70)
      .setDepth(99);

    const emitter = this.partc.createEmitter({
      frame: ["coins1", "coins2", "coins3", "coins4"],
      x: 0,
      y: 0,
      angle: { start: 0, end: 360 },
      speedY: { min: -400, max: 500 },
      speedX: { min: -400, max: 500 },
      lifespan: 2400,
      scale: { start: 0.4, end: 0.5 },
      frequency: 100,
      quantity: 2,
      // blendMode: "ADD",
      // on: false,
    });
    this.mainContainer.add([this.partc]);
    this.sort();
    // this.addBigWin();

    const stopEmitter = () => {
      emitter.stop();
      this.time.delayedCall(1400, () => this.partc.destroy());
    };
    // this.time.delayedCall(2000, stopEmitter, [], this);
  }
  addBigWin() {
    this.big_win = this.add
      .image(0, 0, "atlas", "big_win")
      .addProperties(["pos"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(300)
      .setAlpha(0);

    this.tweens.add({
      targets: this.big_win,
      alpha: 1,
      duration: 200,
      hold: 2300,
      yoyo: true,
    });
    setTimeout(() => this.emitter.emit(EVENTS.NEXT_SCENE), 4000);
  }
  openStore() {
    this.game.network.openStore();
  }
}
