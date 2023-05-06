import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { EntryExit } from 'src/app/models/entry-exit.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  entryExit: EntryExit[];
  entryExitSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.entryExitSub = this.store.select('entryExit').subscribe(({ items }) => {
      this.entryExit = items;
    })
  }

  delete(uid: string) {
    console.log(uid);
  }

  ngOnDestroy(): void {
    this.entryExitSub.unsubscribe();
  }


}
