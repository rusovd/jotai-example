import { atom } from "jotai";
import { ICondition } from "./condition.types";
import { initConditions } from "./constants";

export const conditionsAtoms = atom<ICondition[]>(initConditions);

