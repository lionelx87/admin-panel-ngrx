import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserRegister } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
  }

  createUser() {
    if (this.registerForm.valid) {
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
        });
    }
  }
}
