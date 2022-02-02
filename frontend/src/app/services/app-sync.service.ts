import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/models/AppConfig';
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { QueryOptions, SubscriptionOptions, OperationVariables, } from '../../../node_modules/apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { BackendService } from './backend.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';
import { AWS_REGION } from '../core/Constants';

@Injectable({
  providedIn: 'root'
})
export class AppSyncService {
  private appSyncURL: string | undefined;

  constructor(private backendService: BackendService, private notificationService: NotificationService,
    private userService: UserService) { }

  /**
   * Execute appSync Queries
   * @template T the query return object
   * @template TVariables the query variables
   * @param options the query options
   * @returns Promise<T> Promise of query results
   */
  query<T, TVariables>(options: QueryOptions<TVariables>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.getClient().then(client => {
        client.query<T, TVariables>(options).then(result => {
          resolve(result.data);
        }).catch(reason => {
          this.notificationService.showError('Error executing query', reason);
          reject(reason);
        });
      }).catch(reason => {
        this.notificationService.showError('Error Initializing AppSync Client', reason);
        reject(reason);
      });
    });
  }

  /**
   * Subscribes to an appSync subscription
   * @template T the subscription result
   * @template TVariables the subscription variables
   * @param options the subscription options
   * @returns subscription observable<T>
   */
  subscribe<T = any, TVariables = OperationVariables>(options: SubscriptionOptions<TVariables>): any {
    return from(this.getClient()).pipe(mergeMap(client => {
      return client.subscribe<T, TVariables>(options);
    }), catchError(error => {
      this.notificationService.showError('Error Initializing AppSync Client', error);
      return throwError(error);
    }));
  }

  /**
   * Get the app sync hydrated client
   * @returns app sync hydrated client
   */
  getClient(): Promise<AWSAppSyncClient<NormalizedCacheObject>> {
    return new Promise(resolve => {
      if (this.appSyncURL) {
        console.log(this.userService.getUserToken());
        const hClient = this.initAppSyncClient(this.appSyncURL, this.userService.getUserToken()).hydrated();
        resolve(hClient);
      }
      else {
        this.backendService.getAppConfig().subscribe((config: AppConfig) => {
          this.appSyncURL = config.appsyncURL;
          const hClient = this.initAppSyncClient(this.appSyncURL, this.userService.getUserToken()).hydrated();
          resolve(hClient);
        });
      }
    });
  }

  /**
   * Inits the app sync client
   * @param appSyncUrl the appsync URL
   * @param userToken the user token
   * @returns the app sync client
   */
  private initAppSyncClient(appSyncUrl: string, userToken: string): AWSAppSyncClient<NormalizedCacheObject> {
    return new AWSAppSyncClient({
      url: appSyncUrl,
      region: AWS_REGION,
      auth: { type: AUTH_TYPE.OPENID_CONNECT, jwtToken: async () => (userToken) },
      disableOffline: true
    });
  }
}
