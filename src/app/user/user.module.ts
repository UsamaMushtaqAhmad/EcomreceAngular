import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';


import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
