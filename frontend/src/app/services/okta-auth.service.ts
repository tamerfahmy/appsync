import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccessToken, IDToken, OktaAuth } from '@okta/okta-auth-js';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OktaAuthService {
  LOGIN_REDIRECT_URI = 'http://localhost:4200/callback';
  LOGOUT_REDIRECT_URI = 'http://localhost:4200/loggedout';

  oktaAuth = new OktaAuth({
    clientId: '0oaef234qMqtQnSeo696',
    issuer: 'https://adidas.okta.com/oauth2/default',
    redirectUri: this.LOGIN_REDIRECT_URI,
    pkce: true
  });

  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;

  constructor(private router: Router, private userService: UserService) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then(async val => {
        await this.getIdToken().then(token => {
          this.userService.userToken = token.idToken;
        });
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  async getAccessToken() {
    return await this.oktaAuth.tokenManager.get('accessToken');
  }

  async getIdToken() {
    return await this.oktaAuth.tokenManager.get('idToken');
  }

  login(originalUrl: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    const tokenContainer = await this.oktaAuth.token.parseFromUrl();

    this.oktaAuth.tokenManager.add('idToken', tokenContainer.tokens.idToken as IDToken);
    this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken as AccessToken);

    if (await this.isAuthenticated()) {
      this.observer?.next(true);
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem('okta-app-url') as string;
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI
    });
  }
}
