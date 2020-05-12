import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PaymentsService } from '../services/payments.service';
import { Payment } from '../models/payment';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-add-edit',
  templateUrl: './payment-add-edit.component.html',
  styleUrls: ['./payment-add-edit.component.css']
})
export class PaymentAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formPaymentDescription: string;
  formPaymentDate: string;
  formPaymentAmount: string;
  paymentId: number;
  errorMessage: any;
  existingPayment: Payment;

  constructor(private paymentService: PaymentsService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formPaymentDescription = 'PaymentDescription';
    this.formPaymentDate = 'PaymentDate';
    this.formPaymentAmount = 'PaymentAmount';
    if (this.avRoute.snapshot.params[idParam]) {
      this.paymentId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        paymentId: 0,
        PaymentDescription: ['', [Validators.required]],
        PaymentDate: ['', [Validators.required]],
        PaymentAmount: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.paymentId > 0) {
      this.actionType = 'Edit';
      this.paymentService.getPayment(this.paymentId)
        .subscribe(data => (
          this.existingPayment = data,
          this.form.controls[this.formPaymentDescription].setValue(data.paymentDesciption),     
          this.form.controls[this.formPaymentDate].setValue(this.tranformDate(data.paymentDate)),       
          this.form.controls[this.formPaymentAmount].setValue(data.paymentAmount)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let payment: Payment = {
        paymentDate: this.form.get(this.formPaymentDate).value,        
        paymentDesciption: this.form.get(this.formPaymentDescription).value,
        paymentAmount:  this.form.get(this.formPaymentAmount).value,
        paymentId: 0
      };

      this.paymentService.savePayment(payment)
        .subscribe((data) => {
          this.router.navigate(['/payment', data.paymentId]);
        });
    }

    if (this.actionType === 'Edit') {
      let payment: Payment = {
        paymentId: this.existingPayment.paymentId,
        paymentDate: this.form.get(this.formPaymentDate).value,
        paymentDesciption: this.form.get(this.formPaymentDescription).value,  
        paymentAmount:  this.form.get(this.formPaymentAmount).value
      };
      this.paymentService.updatePayment(payment.paymentId, payment)
        .subscribe((data) => {
          this.router.navigate(['/payment', this.existingPayment.paymentId]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get PaymentAmount() { return this.form.get(this.formPaymentAmount); }
  get PaymentDate() { return   this.form.get(this.formPaymentDate); }
  get PaymentDescription() { return this.form.get(this.formPaymentDescription); }
 
  tranformDate(pDate: Date)
  {
    return new DatePipe('en-US').transform(pDate, 'yyyy-MM-dd');

  }



}
