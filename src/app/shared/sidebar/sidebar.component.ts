import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  fullName: string = "";
  userSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.store.select("auth").subscribe(({ user }) => {
      this.fullName = user?.name;
    });
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(["/login"]));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
