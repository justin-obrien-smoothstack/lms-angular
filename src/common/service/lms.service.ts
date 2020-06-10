import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LmsService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(url);
  }

  post(url, body) {
    return this.http.post(url,body);
  }

  put(url, body) {
    return this.http.put(url,body);
  }

  delete(url) {
    return this.http.delete(url);
  }
}

