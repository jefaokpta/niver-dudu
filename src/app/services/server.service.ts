import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Participant} from "../model/Participant";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private resource = '/api/participants'
  constructor(private http: HttpClient) { }

  findById(id: string) {
    return this.http.get(`${environment.URL_SERVER}${this.resource}/${id}`);
  }

  create(participant: Participant) {
    return this.http.post(`${environment.URL_SERVER}${this.resource}`, participant);
  }

  update(participant: Participant) {
    return this.http.put(`${environment.URL_SERVER}${this.resource}`, participant);
  }
}
