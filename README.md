# Incorporating routing in Angular application


## What is Routing 

Routing in Angular allows the users to create a single-page application with multiple views and allows navigation between them. Users can switch between these views without losing the application state and properties.

## About this exercise

**Previously** we scaffolded a new Angular application in which we have integrated 

* FontAwesome
* Bootstrap

**In this exercise** we will

* Create and configure Routes.
* Parameterized Routes. 

Right now we are going to **setup routes** for a fictitious **bank application** called `BBBank`.

Since its going to be an application for a bank, it's going to have components like 
`dashboard`, `create-account`, `manage-accounts`, `deposit-funds` and `transfer-funds` etc.

We will also create one component to serve as `PageNotFound Component`, that will be shown when a user tries to access a path which is not configured. 

Follow these steps to fulfill all tasks.
-----------

### **Step 1 : Creating Component**

To create a new component run the command as below:

```
       ng g component create-account
```

Using the same command create rest of the components. 

 Once the component is created you will see the component under app folder as below :

![2](https://user-images.githubusercontent.com/100709775/157679786-6e0772d9-8bc7-4c5b-bf3d-75571b2ae8f8.png)


### **Step 2 : Configuring Routes **

Angular CLI automatically injects  `AppRoutingModule` in *app.module.ts* as below

If it was not setup during scaffolding you can add it manually. 

```
 imports: [
    BrowserModule,
    AppRoutingModule  // CLI adds AppRoutingModule to the AppModule's imports array
  ],
```

Now we will define your routes in your Routes array.

Each route in this array is a JavaScript object that contains two properties. First property is path which defines the **URL path** for the route. Second property is component which defines the component Angular should use for the **corresponding path**.

To configure routes for each of the component paste this code is `app-routing.module.ts` 
```javascript

   const routes: Routes = [
        // sets up routes constant where you define your routes
  { path: '', component: DashboardComponent },// This is default route which can be set to any component.
  { path: 'create-account', component: CreateAccountComponent}
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
```
Also import all these components.

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
```


### **Step 3 : [Router Outlet](https://angular.io/api/router/RouterOutlet)**

`<router-outlet>` is a markup from Angular that tells Angular to injects the view of a component for which the route is selected.

Add router-outlet html tag in `app.component.html` as below : 

```javascript
//<!-- The routed views render in the <router-outlet>-->
<router-outlet></router-outlet>
```

### **Step 4 : Using anchor tags to navigate to the routes** 

At this point you can navigate to the routes manually by simply typing the route path after the base url for example to navigate to create-account we can use url as http://localhost:4200/create-account

In a real scenario we will use an **anchor tag** to navigate to a certain route. In an anchor tag you can use **Angular's router Link attribute** (<a [routerLink]="['/']">). Set the value of the attribute to the component to show when a user clicks on a particular link.

Now we will edit our `app.component.html` file and paste this code above `<router-outlet>` 

```javascript
  <ul>
  <li><a [routerLink]="['/']"><i class="fas fa-chart-line"></i> Dashboard</a></li>
  <div>
    <li><a [routerLink]="['/transfer-funds']"><i class="fas fa-random"></i> Transfer Funds</a></li>
    <li><a [routerLink]="['/deposit-funds']"><i class="fas fa-money-check-alt"></i>Deposit Funds</a></li>
    <li><a [routerLink]="['/create-account']"><i class="fas fa-user"></i> Create New Account</a></li>
    <li><a [routerLink]="['/manage-accounts']"><i class="fas fa-users"></i> Manage Accounts</a></li>
  </div>
</ul>
```

This will give the application ability to navigate to a route by clicking on the links. 

    *Please note that [routerLink]="['/'] is the default route.

Now **run** the angular application and click on the create new account link to confirm the routing is working fine. 

![3](https://user-images.githubusercontent.com/100709775/157683359-9039f31b-3a24-405a-94bd-50a7fb89a550.png)

### **Step 5 : Parameterized routes (Passing route params)** 

We often need to pass a parameters to a route. In our scenario to transfer funds from one account to another we will pass **fromAccountID** and **toAccountID** to a `transfer-funds.component.html`

To pass these parameters modify the 'transfer-funds' route in `app.component.html`

```javascript
    <li><a [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i class="fas fa-random"></i> Transfer Funds</a></li>

```
### **Step 6: Parameterized routes (Fetching route data)**

To fetch the parameter values in `transfer-fund.component.ts` we will first import angular's [Activated Route](https://angular.io/api/router/ActivatedRoute) and add it in `constructor`. 
`ActivatedRoute` Provides access to information about a route associated with a component that is loaded in an outlet.

In `ngOnInIt` we will be subscribing the route object to fetch the paramerer values and pass it into a local variable as below: 


```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css']
})
export class TransferFundsComponent implements OnInit {
  fromAccountId: string | undefined;
  toAccountId: string | undefined;
  sub: Subscription | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.fromAccountId = params['fromAccountId']; 
      this.toAccountId = params['toAccountId']; 
   });
  }

}
```

### **Step 7: Displaying Parameter values**

 In `transfer-funds.component.html` simply data bind the local variables to show their values. 

```javascript
<p>transfer-funds works!</p>
FromAccount: {{fromAccountId}}
ToAccount: {{toAccountId}}
```

Run the application and check the parameterize routing is working fine.

![4](https://user-images.githubusercontent.com/100709775/157685517-7aa20132-d8c5-4a38-8336-df7d5a4874d4.png)
