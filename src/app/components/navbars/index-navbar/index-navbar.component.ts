import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import packageInfo from './../../../../../package.json';

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  public version: string = packageInfo.version;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  goToLogin() {
    this.router.navigate(["/auth/login"]);
  }

  goToWebPage() {
    window.location.href = "http://grupoasvida.com/";
  }
}
