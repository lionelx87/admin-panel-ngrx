import { createReducer, on } from "@ngrx/store";
import { setItems, unSetItems } from "./ingreso-egreso.actions";
import { EntryExit } from "../models/entry-exit.model";
import { AppState } from "../app.reducer";

export interface State {
  items: EntryExit[];
}

export interface AppStateWithEntryExit extends AppState {
  entryExit: State;
}

export const initialState: State = {
  items: [],
};

const _entryExitReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function entryExitReducer(state, action) {
  return _entryExitReducer(state, action);
}
