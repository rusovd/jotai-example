import { atom } from "jotai";
import { ICondition } from "./condition.types";
import { initConditions } from "../assets/constants";

export const conditionsAtoms = atom<ICondition[]>(initConditions);

