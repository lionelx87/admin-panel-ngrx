import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AppState } from "./app.reducer";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authService.initAuthListener();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select("ui").pipe(map((ui) => ui.isLoading));
  }
}
