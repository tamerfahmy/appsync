import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OktaAuthService } from './services/okta-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private translate: TranslateService, public oktaAuth: OktaAuthService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.oktaAuth.$isAuthenticated.subscribe(val => {
      this.isAuthenticated = val;
    });
  }
}
