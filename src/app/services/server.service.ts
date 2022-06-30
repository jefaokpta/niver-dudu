import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Participant} from "../model/Participant";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private resource = 'participants'
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }

  findById(id: string) {
    return this.http.get(`${environment.URL_SERVER}/${this.resource}/${id}`);
  }

  update(participant: Participant) {
    return this.http.put(`${environment.URL_SERVER}/${this.resource}`, participant, this.httpHeaders);
  }
}
