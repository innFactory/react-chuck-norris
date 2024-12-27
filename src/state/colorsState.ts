import {atom} from "jotai";
import {RandomColor} from "@/models/randomColor";

export const colorsState = atom<RandomColor[]>([]);
