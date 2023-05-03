import { createAction, props } from "@ngrx/store";
import { UserLogged } from "../models/user.model";

export const setUser = createAction(
  "[Auth Component] setUser",
  props<{ user: UserLogged }>()
);

export const unSetUser = createAction("[Auth Component] UnSetUser");
