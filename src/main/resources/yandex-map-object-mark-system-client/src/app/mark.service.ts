import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/Rx';

import { MARKERS } from './mock-marks';
import { Marker } from './marker';

import * as FileSaver from 'file-saver';


@Injectable()
export class MarkService{

  private webServiceEndPointUrl = 'http://192.168.1.65:8080/objectMarks';
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

  saveMarkToServer(marker : Marker) : Promise<Marker>{
    var bodyMarker = {
      iconContent: marker.iconContent,
      latitude: marker.latitude,
      longitude: marker.longitude,
      preset: marker.preset,
      balloonContentBody: marker.balloonContentBody
    }

    return this.http.post(this.webServiceEndPointUrl + '/create', JSON.stringify(bodyMarker),
    { headers: this.headers})
    .toPromise()
    .then( res => res.json() )
    .catch(this.handleError);
  }

  deleteMarkFromServer(id : number){
    const url = `${this.webServiceEndPointUrl + '/delete'}/${id}`;
    this.http.post(url, { headers : this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateMarkFromServer(marker : Marker): Promise<any>{
    const url = `${this.webServiceEndPointUrl + '/update'}`;
    var bodyMarker = {
      id : marker.id,
      iconContent: marker.iconContent,
      latitude: marker.latitude,
      longitude: marker.longitude,
      preset: marker.preset,
      balloonContentBody: marker.balloonContentBody
    }
    return this.http.post(url, JSON.stringify(bodyMarker), { headers : this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  downloadListOfMarks() : Observable<Blob>{
    const url = `${this.webServiceEndPointUrl + '/getPdf'}`;
    let headers = new Headers({
     'Content-Type': 'application/json',
     'Accept': 'application/pdf'
    });
    let options = new RequestOptions({headers: headers});
    options.responseType = ResponseContentType.Blob;
    return this.http.get(url, options)
    .map(res => res.blob())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
  }
}
