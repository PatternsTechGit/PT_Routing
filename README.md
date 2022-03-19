# Incorporating routing in Anguar application


In this exercise we are going to setup routes for a fictitious bank application called BBBank.


Since its going to be an application for a bank , it's going to have components like 
dashboard, create-account, manage-accounts, deposit-funds and transfer-funds etc

we will also create one component to serve as PageNotFound Component, that will be shown when a user tries to access a path which is not configured.  

<font size="5" color="grey">**Step 1 : Creating Component**</font> 

lets create one of them.

To create a new component run the command as below:

```
       ng g component create-account
```
Using the same command create rest of thecomponents. 

 Once the component is created you will see the component under app folder as below :

![2](https://user-images.githubusercontent.com/100709775/157679786-6e0772d9-8bc7-4c5b-bf3d-75571b2ae8f8.png)


<font size="5" color="grey">**Step 2 : Configuring Routes**</font>  

Angular CLI automatically injects  AppRoutingModule in app.module.ts as below :

If it was not setup during scafolding you can add it manualy. 
```
 imports: [
    BrowserModule,
    AppRoutingModule  // CLI adds AppRoutingModule to the AppModule's imports array
  ],
```

Define your routes in your Routes array.

Each route in this array is a JavaScript object that contains two properties. First property is path which defines the URL path for the route, Second property is component which defines the component Angular should use for the corresponding path.

Configure routes for each of the component you just created in app-routing.module.ts as below: 


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


<font size="5" color="grey">**Step 3 : [Router Outlet](https://angular.io/api/router/RouterOutlet)**</font>  

<router-outlet> is a markup from Angular that tells Angular to injects the view of a component for which the route is selected.

Add router-outlet html tag in app.component.html as below : 

```javascript
//<!-- The routed views render in the <router-outlet>-->
<router-outlet></router-outlet>
```

<font size="5" color="grey">**Step 4 : Using anchor tags to navigate to the routes**</font>  

At this point you can navigate to the routes manually by simply typing the route path after the base url for exampel to navigate to create-account we can use url as http://localhost:4200/create-account

In a real scenario we will use an anchor tag to navigate to a certain route. In an anchor tag you can use Angular's routerLink attribute. Set the value of the attribute to the component to show when a user clicks on a particular link.

To create an unordered list of links place the code above the <router-outlet> in app.component.html

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
To add styling in links with icon you can use font Awsome. 
To add font awsome in angular applicaiton [Click Here](https://github.com/PatternsTechGit/PT_Fontawesoome_Bootstrap)

This will give the applciaiton ability to naigate to a route by clicking on the links. 

Please note that [routerLink]="['/'] is the default route.

Run the angular application and click on the create new account link to confirm the routing is working fine. 

![3](https://user-images.githubusercontent.com/100709775/157683359-9039f31b-3a24-405a-94bd-50a7fb89a550.png)


<font size="5" color="grey">**Step 5 : Parameterized routes (Passing route params)**</font>  

We often need to pass a parameters to a route. In our scenario to transfer funds from one account to another we will pass fromAccountID and toAccountID to a TransferFundsComponent.

To pass these parameters modify the 'transfer-founds' route like below :

```javascript
 <div>
    <li><a [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i class="fas fa-random"></i> Transfer Funds</a></li>
  </div>
```
<font size="5" color="grey">**Step 6: Parameterized routes (Fetching route data)**</font>

To fetch the parameter values in transfer-fund.component.ts we will first import angular's [Activated Route](https://angular.io/api/router/ActivatedRoute) and add it in constructor. 
ActivatedRoute Provides access to information about a route associated with a component that is loaded in an outlet.

In ngOnInIt we will be subscribing the route object to fetch the paramerer values and pass it into a local variable as below: 


```javascript
 fromAccountId: string | undefined;
  toAccountId: string | undefined;

constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.fromAccountId = params['fromAccountId']; // Getting relevant value from params object.
      this.toAccountId = params['toAccountId']; // Getting relevant value from params object.
   });
  }
```

<font size="5" color="grey">**Step 7: Displaying Paramer values**</font>

 In transfer-fund.component.html simply data bind the local variables to show their values. 

```javascript
<p>transfer-funds works!</p>
FromAccount: {{fromAccountId}}
ToAccount: {{toAccountId}}
```
Run the application and check the parameterize routing is working fine.

![4](https://user-images.githubusercontent.com/100709775/157685517-7aa20132-d8c5-4a38-8336-df7d5a4874d4.png)
