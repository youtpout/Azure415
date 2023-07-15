import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  public publish(body: any) {
    const formData = new FormData();
    for (let key in body) {
      if (key === "pictures") {
        const files = body[key] as File[];
        if (files?.length > 0) {
          files.forEach((f, i) => formData.append(key, f));
        } else {
          formData.append(key, null);
        }
      } else {
        formData.append(key, body[key]);
      }
    }

    return this.http.post<any>(this.baseUrl + "weatherforecast", formData);
  }


}
