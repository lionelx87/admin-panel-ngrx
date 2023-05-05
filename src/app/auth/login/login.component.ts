import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { UserLogin } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { isLoading, stopLoading } from "src/app/shared/ui.actions";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  get validEmail() {
    return this.loginForm.get("email").valid;
  }

  get validPassword() {
    return this.loginForm.get("password").valid;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["lionel@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required]],
    });

    this.uiSubscription = this.store.select("ui").subscribe((ui) => {
      // console.log("Valor: ", ui.isLoading);
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(isLoading());
      const { email, password }: UserLogin = this.loginForm.value;
      this.authService
        .login({ email, password })
        .then((userCredential) => {
          this.router.navigate(["/"]);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          });
        })
        .finally(() => this.store.dispatch(stopLoading()));
    }
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
