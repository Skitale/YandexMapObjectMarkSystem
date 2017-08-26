import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import { MARKERS } from './mock-marks';
import { Marker } from './marker';




@Injectable()
export class MarkService{

  private webServiceEndPointUrl = 'http://localhost:8080/objectMarks';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getMarks(): Promise<Marker[]> {
    return Promise.resolve(MARKERS);
  }

  getMarksFromServer(): Promise<any> {
    return this.http.get(this.webServiceEndPointUrl + '/list')
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
  }

  saveMarkToServer(marker : Marker) : void{
    var bodyMarker = {
      textMark: marker.iconContent,
      latitude: marker.coordinates[0],
      longitude: marker.coordinates[1],
      pathIconMark: marker.preset
    }

    this.http.post(this.webServiceEndPointUrl + '/addMark', JSON.stringify(bodyMarker),
    { headers: this.headers}).subscribe(data => { console.log(data) },
      (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
  }
}
