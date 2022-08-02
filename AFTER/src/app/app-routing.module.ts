import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';

const routes: Routes = [
  // sets up routes constant where you define your routes
{ path: '', component: DashboardComponent },// This is default route which can be set to any component.
{ path: 'create-account', component: CreateAccountComponent},
{ path: 'manage-accounts', component:ManageAccountsComponent },
{ path: 'deposit-funds', component: DepositFundsComponent },
{ path: 'transfer-funds', component: TransferFundsComponent },
{ path: '**', component: PageNotFoundComponent },// Wildcard route for a 404 page, When user tries to navigate a route which is not configured.
]; 

// configures NgModule imports and exports
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
