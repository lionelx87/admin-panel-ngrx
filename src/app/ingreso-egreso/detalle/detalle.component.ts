import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { EntryExit } from 'src/app/models/entry-exit.model';
import { EntryExitService } from 'src/app/services/entry-exit.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  entryExit: EntryExit[];
  entryExitSub: Subscription;

  constructor(private store: Store<AppState>, private entryExitService: EntryExitService) { }

  ngOnInit() {
    this.entryExitSub = this.store.select('entryExit').subscribe(({ items }) => {
      this.entryExit = items;
    })
  }

  delete(uid: string) {
    this.entryExitService.deleteEntryExit(uid).then(() => console.log('Eliminado correctamente!'));
  }

  ngOnDestroy(): void {
    this.entryExitSub.unsubscribe();
  }


}
