import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIpService {

  constructor(
    private _http: HttpClient
  ) { }

  IpClient():Observable<any>{
    return this._http.get('https://api.ipify.org/?format=json');
  };
};
