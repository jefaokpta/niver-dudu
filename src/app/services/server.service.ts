import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Participant} from "../model/Participant";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private resource = 'participants'
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YWRtaW46YWRtaW4='
    })
  }
  constructor(private http: HttpClient) { }

  findById(id: string) {
    return this.http.get(`${environment.URL_SERVER}/${this.resource}/${id}`, this.options);
  }

  update(participant: Participant) {
    return this.http.put(`${environment.URL_SERVER}/${this.resource}`, participant, this.options);
  }
}
