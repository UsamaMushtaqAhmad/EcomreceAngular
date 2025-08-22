import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {ProductUploadComponent} from "./product-upload/product-upload.component"

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'upload-product', component: ProductUploadComponent }  // 👈 new route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
