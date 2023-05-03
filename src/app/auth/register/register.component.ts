import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { UserRegister } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { isLoading, stopLoading } from "src/app/shared/ui.actions";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  get validName(): boolean {
    return this.registerForm.get("name").valid;
  }

  get validEmail(): boolean {
    return this.registerForm.get("email").valid;
  }

  get validPassword(): boolean {
    return this.registerForm.get("password").valid;
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.uiSubscription = this.store.select("ui").subscribe((ui) => {
      console.log(ui.isLoading);
    });
  }

  createUser() {
    if (this.registerForm.valid) {
      this.store.dispatch(isLoading());
      const { name, email, password }: UserRegister = this.registerForm.value;
      this.authService
        .createUser({ name, email, password })
        .then((credenciales) => {
          console.log(credenciales);
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
