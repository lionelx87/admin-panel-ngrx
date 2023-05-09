import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { Subscription, filter, pipe } from "rxjs";
import { EntryExitService } from "../services/entry-exit.service";
import { setItems } from "../ingreso-egreso/ingreso-egreso.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  entryExitSub: Subscription;
  constructor(
    private store: Store<AppState>,
    private entryExitService: EntryExitService
  ) {}

  ngOnInit() {
    this.authSub = this.store
      .select("auth")
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.entryExitSub = this.entryExitService
          .initEntryExitListener(user.uid)
          .subscribe((entryExit: any) => {
            this.store.dispatch(setItems({ items: entryExit }));
          });
      });
  }

  ngOnDestroy(): void {
    this.entryExitSub?.unsubscribe();
    this.authSub.unsubscribe();
  }
}
