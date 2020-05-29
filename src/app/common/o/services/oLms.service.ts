import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OLmsService {
  constructor(private httpClient: HttpClient) {}

  get(url: string) {
    return this.httpClient.get(url);
  }

  put(url: string, body: any = "", options: object = {}) {
    return this.httpClient.put(url, body, options);
  }

  delete(url: string, options: any = {}) {
    return this.httpClient.delete(url, options);
  }
}
