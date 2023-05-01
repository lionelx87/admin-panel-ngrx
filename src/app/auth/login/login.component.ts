import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserLogin } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get validEmail() {
    return this.loginForm.get("email").valid;
  }

  get validPassword() {
    return this.loginForm.get("password").valid;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password }: UserLogin = this.loginForm.value;
      this.authService.login({ email, password }).then((userCredential) => {
        console.log(userCredential);
        this.router.navigate(["/"]);
      });
    }
  }
}
