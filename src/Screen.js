export default class Screen {
  static get phoneProportions() {
    return (
      window.innerWidth / window.innerHeight >= 1.6 ||
      window.innerHeight / window.innerWidth >= 1.6
    );
  }

  static get iphoneSEProportions() {
    return (
      (window.innerWidth / window.innerHeight >= 1.6 &&
        window.innerWidth / window.innerHeight < 1.8) ||
      (window.innerHeight / window.innerWidth >= 1.6 &&
        window.innerHeight / window.innerWidth < 1.82)
    );
  }

  static get isPhone() {
    return Screen.phoneProportions && !Screen.iphoneSEProportions;
  }

  // eslint-disable-next-line getter-return
  static get dropZonePosition() {
    return {
      lx: 1050,
      ly: 620,
      px: 700,
      py: 1450,
    };
  }
}
