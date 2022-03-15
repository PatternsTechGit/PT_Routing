import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageAccountsComponent,
    CreateAccountComponent,
    DepositFundsComponent,
    TransferFundsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // CLI adds AppRoutingModule to the AppModule's imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
