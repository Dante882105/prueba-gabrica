import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GuardarDatosService {

  private URL:string = 'http://localhost/backend_gabrica/prueba-gabrica/backend/save_data.php';
  public headers!: HttpHeaders;

  constructor(
    private _http: HttpClient
  ) { }

  guardado(datos:FormGroup):Observable<any>{
    let params = JSON.stringify(datos);
    return this._http.post(this.URL, params, {headers: this.headers});
  };
};
