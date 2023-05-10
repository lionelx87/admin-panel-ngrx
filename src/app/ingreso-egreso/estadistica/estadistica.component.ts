import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { EntryExit } from "src/app/models/entry-exit.model";
import { ChartData, ChartEvent, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { AppStateWithEntryExit } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  // Doughnut
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public doughnutChartLabels: string[] = ["Ingresos", "Egresos"];
  public doughnutChartData: ChartData<"doughnut"> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  public doughnutChartType: ChartType = "doughnut";

  entry: number = 0;
  exit: number = 0;
  totalEntry: number = 0;
  totalExit: number = 0;

  constructor(private store: Store<AppStateWithEntryExit>) {}

  ngOnInit() {
    this.store
      .select("entryExit")
      .subscribe(({ items }) => this.generateStatistics(items));
  }

  generateStatistics(items: EntryExit[]) {
    this.entry = 0;
    this.exit = 0;
    this.totalEntry = 0;
    this.totalExit = 0;
    for (const item of items) {
      if (item.type === "entry") {
        this.totalEntry += item.amount;
        this.entry++;
      } else {
        this.totalExit += item.amount;
        this.exit++;
      }
    }

    this.doughnutChartData.datasets = [
      {
        data: [this.totalEntry, this.totalExit],
      },
    ];

    this.chart?.chart?.update();
  }
}
