import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginGQL, User } from "src/app/core/graphql/graphq";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginGql: LoginGQL,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.formLogin = this.fb.group({
      email: [],
      password: [],
    });
  }

  onSubmit() {
    const value = this.formLogin.value;
    this.loginGql.mutate({
      input: {
        email: value.email,
        password: value.password,
      }
    }).subscribe({
      next: (v) => {
        if (v.data?.login){
          this.authService.user = v.data.login as User;
          this.goToDashboard();
        }
      },
      error: (e) => {
        //TODO handle error no login
      },
      complete: () => console.info('complete') 
    });
  }

  goToDashboard() {
    this.router.navigate(["/admin/dashboard"]);
  }





}
