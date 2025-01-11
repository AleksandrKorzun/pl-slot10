import { EVENTS_DEFAULT } from "@holywater-tech/ads-builder/framework/components/EventsDispatcher";
import Screen from "../Screen";

export const EVENTS = {
  ...EVENTS_DEFAULT,
  ON_MACHINE_CLICK: "onMachineClick",
  ON_STOP_CLICK: "onStopClick",
  NEXT_SCENE: "NEXT_SCENE",
  ON_DESELECT_CLICK: "onDeselectClick",
  ON_BUTTON_CLICK_START: "onButtonClickStart",
  HAPPY: "happy",
  SHOW_DRESS_ITEM: "setItems",
  SHOW_NEXT_ITEM: "onChangeScene",
  REMOVE_ITEM: "removeItem",
  CHANGE_SCENE: "onChangeScene",
  CHANGE_HAIR: "onChangeHair" /* your custom events */,
};

export const ITEMS = ["1", "2", "3", "4", "5"];
export const LAYERS_DEPTH = {
  TITLE: 5,
  ITEM_GLOW: 35,
  ITEM_BASE: 34,
  ITEM: 30,
  MISTAKES: 33,
  TIMER: 35,
  HAND_TUTORIAL: 44,
};
export const SPIN_ITEMS = [
  { name: "slot1" },
  { name: "slot2" },
  { name: "slot3" },
  { name: "slot4" },
  { name: "slot5" },
  { name: "slot6" },
  { name: "slot7" },
  // { name: "slot8" },
  // { name: "slot9" },
];
export const POSITIONS_SPIN1 = [
  { x: -300, y: -100, ball: "one" },
  { x: -200, y: -100, ball: "five" },
  { x: -100, y: -100, ball: "three" },
  { x: 0, y: 0, ball: "two" },
  { x: 100, y: 100, ball: "six" },
  { x: 200, y: 200, ball: "four" },
];
export const POSITIONS_SPIN2 = [
  { x: -300, y: -100, ball: "three" },
  { x: -200, y: -100, ball: "six" },
  { x: -100, y: -100, ball: "five" },
  { x: 0, y: 0, ball: "two" },
  { x: 100, y: 100, ball: "one" },
  { x: 200, y: 200, ball: "four" },
];
export const POSITIONS_SPIN3 = [
  { x: -300, y: -100, ball: "one" },
  { x: -200, y: -100, ball: "two" },
  { x: -100, y: -100, ball: "three" },
  { x: 0, y: 0, ball: "four" },
  { x: 100, y: 100, ball: "five" },
  { x: 200, y: 200, ball: "six" },
];

export const SLOT1 = {
  // base: "slot1_base",
  position: [0, 0],
  // middle: "slot1_middle",
  middlePosition: [16, 92],
  positionSpin: [
    { x: -90, y: 40 },
    { x: -5, y: 40 },
    { x: 78, y: 40 },
  ],
  distanceBetween: 100,
  highPosition: -150,
  scale: 0.65,
  depth: 12,
  slots: SPIN_ITEMS,
  winBorder: [
    { x: -130, y: 40 },
    { x: 0, y: 40 },
    { x: 125, y: 40 },
  ],
  winScale: 0.75,
};

export const SCALE = {
  choices: Screen.phoneProportions
    ? [0.8, 0.8, 0.8, 0.8]
    : [0.8, 0.8, 0.8, 0.8],
  mistakes: Screen.phoneProportions ? [0, 180, 0, 230] : [0, 180, 0, 280],
  buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
  title: Screen.phoneProportions
    ? [0.22, 0.22, 0.22, 0.22]
    : [0.22, 0.22, 0.22, 0.22],
  messageTitle: Screen.phoneProportions ? [0, 350, 0, -100] : [0, 350, 0, -30],
  level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};

export const SHEETS = {
  ITEM_BASE: "btn",
  ITEM_GLOW: "btn_tap",
  HAND_TUTORIAL: "hand_tutorial",
};
export const POSITIONS_PHONE = {
  collect: Screen.phoneProportions ? [0, 80, 0, 350] : [0, 80, 0, 280],
  board: Screen.phoneProportions ? [0, -340, 0, -400] : [0, -220, 0, -220],
  coins: Screen.phoneProportions
    ? [250, -100, -140, 140]
    : [250, -100, -140, 140],
  spinner: Screen.phoneProportions ? [-250, 0, 130, 200] : [-250, 0, 130, 200],
};
export const POSITIONS = {
  collect:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.collect
      : [0, 130, 0, 250],
  board:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.board
      : [0, -350, 0, -280],
  coins:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.coins
      : [230, -220, -160, 140],
  spinner:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.spinner
      : [-250, -200, 130, 200],
};

const SCALES_PHONE = {
  board: Screen.phoneProportions ? [1, 1, 1.15, 1.15] : [0.85, 0.85, 0.9, 0.9],
  collect: Screen.phoneProportions ? [1, 1, 1, 1] : [1, 1, 1, 1],
  coins: Screen.phoneProportions ? [0.8, 0.8, 0.5, 0.5] : [0.8, 0.8, 0.5, 0.5],
};

export const SCALES = {
  collect:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.collect
      : [0.7, 0.7, 0.56, 0.56],
  board:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.board
      : [1.1, 1.1, 1.1, 1.1],
  coins:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.coins
      : [0.7, 0.7, 0.5, 0.5],
  timer:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.timer
      : [0.9, 0.9, 0.7, 0.7],
  buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
  title: Screen.phoneProportions
    ? [0.22, 0.22, 0.22, 0.22]
    : [0.22, 0.22, 0.22, 0.22],
  messageTitle: Screen.phoneProportions ? [0, 350, 0, -100] : [0, 350, 0, -30],
  level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};

export const BET = [
  { "10K": 10000 },
  { "125K": 125000 },
  { "1M": 1000000 },
  { "2.5M": 2500000 },
  { "20.5M": 20500000 },
  { "50M": 50000000 },
  { "100M": 100000000 },
];
