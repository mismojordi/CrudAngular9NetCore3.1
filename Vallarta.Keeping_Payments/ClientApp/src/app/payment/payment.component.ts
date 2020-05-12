import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PaymentsService } from '../services/payments.service';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payment$: Observable<Payment>;
  paymentId: number;

  constructor(private paymentService: PaymentsService, private avRoute: ActivatedRoute) { 
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.paymentId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.loadPayment();
  }
  loadPayment(){
    this.payment$ = this.paymentService.getPayment(this.paymentId);
  }

}
