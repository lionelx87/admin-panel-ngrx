import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EntryExit } from 'src/app/models/entry-exit.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  entry: number = 0;
  exit: number = 0;
  totalEntry: number = 0;
  totalExit: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('entryExit').subscribe( ({ items }) => this.generateStatistics(items))
  }

  generateStatistics(items: EntryExit[]) {
    for(const item of items) {
      if(item.type === 'entry') {
        this.totalEntry += item.amount;
        this.entry ++;
      }else {
        this.totalExit += item.amount;
        this.exit ++;
      }
    }

  }

}
