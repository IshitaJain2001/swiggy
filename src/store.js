import { createStore } from "redux";
import { reducerFn } from "./reducer";

export const store= createStore(reducerFn)