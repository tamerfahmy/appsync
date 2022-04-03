import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GaugeModule } from 'angular-gauge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DropdownModule, MessageService } from 'primeng';
import { LoggedOutComponent } from './pages/logged-out/logged-out.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { OktaAuthService } from './services/okta-auth.service';
import { ApiInterceptor } from './interceptors/ApiInterceptor';
import { UserService } from './services/user.service';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoggedOutComponent,
    NotFoundComponent,
    CallbackComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    GaugeModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    OktaAuthService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
