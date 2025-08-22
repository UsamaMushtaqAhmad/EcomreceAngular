import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
