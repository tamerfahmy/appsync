import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from 'src/app/services/okta-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuth.logout();
  }
}
