# Incorporating routing in Anguar application


We are making single page banking application and in a bank application we will have links to navigate to different components (e.g. create account, manage account) of our application.

Here are the steps to add routing in angular application.


<font size="5" color="grey">**Step 1**</font> 

We will be creating multiple compnents.

To create a new component run the command as below:

```
       ng g component create-account
```

 Once the component is created you will see the component under app folder as below :

![2](https://user-images.githubusercontent.com/100709775/157679786-6e0772d9-8bc7-4c5b-bf3d-75571b2ae8f8.png)


<font size="5" color="grey">**Step 2**</font>  

Angular CLI automatically injects  AppRoutingModule in app.module.ts as below : 

```
 imports: [
    BrowserModule,
    AppRoutingModule  // CLI adds AppRoutingModule to the AppModule's imports array
  ],
```
For adding routing details open app-routing.module.ts and add following code in routes 


```javascript
   const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create-account', component: CreateAccountComponent}
  { path: 'manage-accounts', component:ManageAccountsComponent },
  { path: 'deposit-funds', component: DepositFundsComponent },
  { path: 'transfer-funds', component: TransferFundsComponent },
  { path: '**', component: PageNotFoundComponent },
];

Here NgModule is already using routes object for routing.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```

Here Routes takes an array of route that has path and component. the path is the routing url and component is used for mapping the url with specific component.
As here url 'create-account' is mapped with CreateAccountcomponent.

<font size="5" color="grey">**Step 3**</font>  

Router-outlet in Angular works as a placeholder which is used to load the different components dynamically based on the activated component or current route state. 

Add router-outlet html tag in app.component.html as below : 

```
<router-outlet></router-outlet>
```

<font size="5" color="grey">**Step 4**</font>  

Add the folling code in app.component.html

```javascript
  <div>
       <li><a [routerLink]="['/create-account']"><i class="fas fa-user"></i> Create New Account</a></li>
    <li><a [routerLink]="['/manage-accounts']"><i class="fas fa-users"></i> Manage Accounts</a></li>>
  </div>
```

Run the angular application and click on the create new account link to confirm the routing is working fine. 

![3](https://user-images.githubusercontent.com/100709775/157683359-9039f31b-3a24-405a-94bd-50a7fb89a550.png)


<font size="5" color="grey">**Step 5**</font>  

## Parameterised Routing
We often need to pass a parameter like an ID to a route and then access that ID in order to call an API to get some data. 

For paramterize routes we will add code in app.component.html as below :

```javascript
 <div>
    <li><a [routerLink]="['/transfer-funds', { fromAccountId: '111', toAccountId: '222' }]"><i class="fas fa-random"></i> Transfer Funds</a></li>
  </div>
```

Here we are sending multiple parameters like fromAccountId & toAccountId.

To fetch the parameter values in our transfer-fund.component.ts we will first import angular's ActivatedRoute and add it in constructor.

In ngOnInIt we will be subscribing the route object to fetch the paramerer values as below: 


```javascript
 fromAccountId: string | undefined;
  toAccountId: string | undefined;

constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.fromAccountId = params['fromAccountId']; 
      this.toAccountId = params['toAccountId']; 
   });
  }
```

Add code in transfer-fund.component.html to confirm the paramerized routing is working fine.

```javascript
<p>transfer-funds works!</p>
FromAccount: {{fromAccountId}}
ToAccount: {{toAccountId}}
```
Run the application and check the parameterize routing is working fine.

![4](https://user-images.githubusercontent.com/100709775/157685517-7aa20132-d8c5-4a38-8336-df7d5a4874d4.png)
