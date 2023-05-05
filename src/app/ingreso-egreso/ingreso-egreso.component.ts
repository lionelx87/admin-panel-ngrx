import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  entryForm: FormGroup;
  type: string = "entry";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.entryForm = this.fb.group({
      description: ["", Validators.required],
      amount: ["", Validators.required],
    });
  }

  save() {
    if (this.entryForm.valid) {
      console.log(this.entryForm.value);
      console.log(this.type);
    }
  }
}
