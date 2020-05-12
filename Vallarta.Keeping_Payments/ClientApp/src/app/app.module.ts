import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentAddEditComponent } from './payment-add-edit/payment-add-edit.component';
import { PaymentsService } from './services/payments.service';



@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    PaymentComponent,
    PaymentAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PaymentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
