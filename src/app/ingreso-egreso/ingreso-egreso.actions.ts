import { createAction, props } from '@ngrx/store';
import { EntryExit } from '../models/entry-exit.model';

export const setItems = createAction(
    '[IngresoEgreso] Set Items',
    props<{ items: EntryExit[] }>()
);
export const unSetItems = createAction('[IngresoEgreso] Unset Items');