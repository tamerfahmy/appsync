import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OktaAuthService } from './services/okta-auth.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {
  isAuthenticated: boolean = false;

  constructor(private translate: TranslateService, public oktaAuth: OktaAuthService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.oktaAuth.$isAuthenticated.subscribe(val => {
      this.isAuthenticated = val;
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   let a = $("a[title|='Logout']").attr("href", "www.google.com");
    //   console.log(a);
    // }, 2000);
  }
  ngAfterContentInit(): void {
    // let e = document.getElementById('_mdspbar');
    // console.log(e);
  }

}
