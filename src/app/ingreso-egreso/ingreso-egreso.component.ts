import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EntryExit } from "../models/entry-exit.model";
import { EntryExitService } from "../services/entry-exit.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { isLoading, stopLoading } from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  entryForm: FormGroup;
  type: string = "entry";

  constructor(
    private fb: FormBuilder,
    private entryExitService: EntryExitService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.entryForm = this.fb.group({
      description: ["", Validators.required],
      amount: ["", Validators.required],
    });
  }

  save() {
    if (this.entryForm.valid) {
      this.store.dispatch(isLoading());
      const { description, amount } = this.entryForm.value;

      const entryExit: EntryExit = {
        description,
        amount,
        type: this.type,
      };

      this.entryExitService
        .createEntryExit(entryExit)
        .then(() => this.entryForm.reset())
        .finally(() => this.store.dispatch(stopLoading()));
    }
  }
}
