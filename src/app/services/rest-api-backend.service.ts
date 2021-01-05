import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
const httpOptions = {
  header: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class RestApiBackendService {
  //UBICACION DE ARCHIVO API

  private API: string = "http://127.0.0.1:8000/api/";
  constructor(private http: HttpClient) {}

  getClaveProfetional(): any {
    return this.http.get(this.API + "getTokenAccess");
  }
  postEmailProfetional(fromData: Object):any{
    return this.http.post(this.API+'sendEmail',fromData);
  }
}
