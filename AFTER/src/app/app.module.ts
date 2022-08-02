import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    ManageAccountsComponent,
    DepositFundsComponent,
    TransferFundsComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
