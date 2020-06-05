import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.get("email").value;
    const password = this.loginForm.get("password").value;
    this.authService.login(email, password);
  }
}
