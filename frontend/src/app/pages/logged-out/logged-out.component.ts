import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from 'src/app/services/okta-auth.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss']
})
export class LoggedOutComponent implements OnInit {
  constructor(private okta: OktaAuthService) {

  }

  ngOnInit(): void {
  }
}
