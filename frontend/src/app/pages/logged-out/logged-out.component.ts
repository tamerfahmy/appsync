import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from 'src/app/services/okta-auth.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss']
})
export class LoggedOutComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(public oktaAuth: OktaAuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.oktaAuth.$isAuthenticated.subscribe(val => {
      this.isAuthenticated = val;
      if(this.isAuthenticated) {
        this.router.navigate(['/overview']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
