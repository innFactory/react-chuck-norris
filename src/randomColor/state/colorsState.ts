import { atom } from "recoil";
import { RandomColor } from "../model/RandomColor";

export const colorsState = atom<RandomColor[]>({
  key: "colorsState",
  default: [],
});
