import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Payments/';
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getPayment(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(this.myAppUrl + this.myApiUrl + paymentId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  savePayment(payment): Observable<Payment> {
    return this.http.post<Payment>(this.myAppUrl + this.myApiUrl, JSON.stringify(payment), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updatePayment(paymentId: number, payment): Observable<Payment> {
    return this.http.put<Payment>(this.myAppUrl + this.myApiUrl + paymentId, JSON.stringify(payment), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deletePayment(paymentId: number): Observable<Payment> {
    return this.http.delete<Payment>(this.myAppUrl + this.myApiUrl + paymentId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }  
}
