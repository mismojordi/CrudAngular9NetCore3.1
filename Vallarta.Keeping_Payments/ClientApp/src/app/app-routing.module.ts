import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentAddEditComponent } from './payment-add-edit/payment-add-edit.component';


const routes: Routes = [
  { path: '', component: PaymentsComponent, pathMatch: 'full' },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'add', component: PaymentAddEditComponent },
  { path: 'payment/edit/:id', component: PaymentAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
