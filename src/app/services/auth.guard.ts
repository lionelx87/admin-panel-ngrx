import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Promise<boolean> | boolean {
    return this.authService.isAuth().then((isLogged) => {
      if (!isLogged) {
        this.router.navigate(["/login"]);
        return;
      }
      return isLogged;
    });
  }

  canActivate(): Promise<boolean> {
    return this.authService.isAuth().then((isLogged) => {
      if (!isLogged) {
        this.router.navigate(["/login"]);
        return;
      }
      return isLogged;
    });
  }
}
