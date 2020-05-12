import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { PaymentsService } from '../services/payments.service';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments$: Observable<Payment[]>;

  constructor(private paymentService: PaymentsService) { }

  ngOnInit(): void {
    this.loadAllPayments();
  }

  loadAllPayments(){
    this.payments$ = this.paymentService.getAllPayments();
  }

}
