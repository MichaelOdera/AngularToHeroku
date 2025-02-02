import { Injectable } from '@angular/core';
import { Quote } from '../quote-class/quote';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService {

  quote: Quote;

  constructor(private http: HttpClient) {
    this.quote = new Quote("", "");
  }

  quoteRequest() {
    interface ApiResponse {
      author: string;
      quote: string;
    }
      let promise = new Promise((resolve, reject) => {
        this.http.get<ApiResponse>(environment.baseUrl).toPromise().then(response => {
          this.quote.author = response.author;
          this.quote.quote = response.quote;

          resolve()
        }, error => {
          this.quote.quote = "Never, never, never give up"
          this.quote.author = "Winston Churchill"

          reject(error)
        })
      })
    return promise;
  }
}

