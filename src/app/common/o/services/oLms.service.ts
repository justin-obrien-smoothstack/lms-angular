import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OLmsService {
  constructor(private httpClient: HttpClient) {}

  get(url: string, options: any = {}) {
    return this.httpClient.get(url, options);
  }

  put(url: string, body: any = "", options: object = {}) {
    return this.httpClient.put(url, body, options);
  }
}
