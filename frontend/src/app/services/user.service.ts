import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { STATE_TOKEN_CLAIM_PROPERTY } from '../core/Constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToken: string = '' ;

  constructor() {

  }

  /**
   * Gets the current user token
   * @returns user token
   */
  getUserToken(): string  {
    return this.userToken;
  }

  /**
   * Gets the current user tenant
   * @returns user tenant
   */
  getUserTenant(): string  {
    if (this.userToken) {
      const decodedToken = jwt_decode<any>(this.userToken);
      if (decodedToken && decodedToken[STATE_TOKEN_CLAIM_PROPERTY]) {
        return decodedToken[STATE_TOKEN_CLAIM_PROPERTY];
      }
    }

    return '';
  }
}
