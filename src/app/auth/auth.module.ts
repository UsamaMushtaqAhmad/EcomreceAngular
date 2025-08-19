// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AuthRoutingModule } from './auth-routing.module';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { LogoutComponent } from './logout/logout.component';


// @NgModule({
//   declarations: [
//     LoginComponent,
//     RegisterComponent,
//     LogoutComponent
//   ],
//   imports: [
//     CommonModule,
//     AuthRoutingModule
//   ]
// })
// export class AuthModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,    // ye components declare honge
    RegisterComponent  // ye components declare honge
  ],
  imports: [
    CommonModule,      
    FormsModule,       // [(ngModel)] ke liye
    AuthRoutingModule  // routing ke liye
  ]
})
export class AuthModule { }