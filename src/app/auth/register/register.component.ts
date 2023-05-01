import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.registerForm);
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
  }
}
