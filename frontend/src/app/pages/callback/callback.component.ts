import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from 'src/app/services/okta-auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService) { }

  ngOnInit(): void {
    // Handles the response from Okta and parses tokens
    this.okta.handleAuthentication();
  }

}
