import { Component , OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Marker } from './marker';
import { MarkService } from './mark.service';
import { WindowRef } from './window-ref';

declare var ymaps: any;
declare var $: any;

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   currentUserName: string;

   markers : Marker[] = [];
   myMap : any;
   selectedMarkYApi : any;
   searchMarkYApi : any;
   selectedMark : Marker = new Marker();
   searchMark: Marker = new Marker();
   selectedMarkForModalForm: Marker;

   submittedForm: boolean = false;
   isSaveSelectedMarker: boolean = false;
   isSaveSearchMarker: boolean = false;

   constructor(private markService: MarkService, private win: WindowRef, private ref: ChangeDetectorRef){
     //ref.detach();
     //console.log('Window object', win.nativeWindow);
   }


  ngOnInit(): void {
    this.getUserNameSession();

    ymaps.ready(() => {
       this.myMap = new ymaps.Map("map", {
         center: [55.76, 37.64],
         zoom: 7,
         controls: []
       });
       this.selectedMarkYApi = new ymaps.Placemark([], {
             }, {
               preset: 'islands#darkOrangeDotIconWithCaption',
               draggable: true,
               visible: false
             }
        );
        this.searchMarkYApi = new ymaps.Placemark([], {
              }, {
                preset: 'islands#darkOrangeDotIconWithCaption',
                draggable: false,
                visible: false
              }
         );
       this.selectedMark.refMarkApi = this.selectedMarkYApi;
       this.searchMark.refMarkApi = this.searchMarkYApi;
       this.myMap.geoObjects.add(this.selectedMarkYApi);
       this.myMap.geoObjects.add(this.searchMarkYApi);

       this.registrationEventClickOnMap();
       this.registrationEventDragEnd();

       this.getMarksFromServer();
    });

  }


  drawMarkersOnMap(){
    this.markers.forEach((item, i, arr) =>{
      this.drawMarkerOnMap(item);
    });
  }

  drawMarkerOnMap(marker : Marker){
    if(marker.balloonContentBody == null){
      marker.balloonContentBody = '';
    }
    if(marker.iconContent == null){
      marker.iconContent = '';
    }
    if(marker.preset == null){
      marker.preset = '';
    }
    var mark = new ymaps.Placemark([marker.latitude, marker.longitude], {
      balloonContentHeader: marker.iconContent,
      balloonContentBody: marker.balloonContentBody,
      iconContent: marker.iconContent,
      iconCaption: marker.iconContent,
    }, {
      preset: marker.preset,
      draggable: false
    });
    marker.refMarkApi = mark;
    this.myMap.geoObjects.add(mark);
  }

  clearMarkerOnMap(marker : Marker){
    this.myMap.geoObjects.remove(marker.refMarkApi);
    marker.refMarkApi = null;
  }

  registrationEventClickOnMap(){
    this.selectedMark.preset = 'islands#darkBlueDotIconWithCaption';
    this.myMap.events.add('click', (e) =>{
      this.isSaveSelectedMarker = false;
      this.selectedMarkYApi.options.set('visible', true);
      this.selectedMarkYApi.geometry.setCoordinates(e.get('coords'));
      this.getGeoCodeAndSetProperties(this.selectedMarkYApi, this.selectedMark);
    });
  }

  registrationEventDragEnd(){
    this.selectedMarkYApi.events.add('dragend', (e) =>{
      this.isSaveSelectedMarker = false;
      this.getGeoCodeAndSetProperties(this.selectedMarkYApi, this.selectedMark);
    });
  }

  updateSyncDataOfMarker(markerYApi: any, marker: Marker){
    marker.latitude = markerYApi.geometry.getCoordinates()[0];
    marker.longitude = markerYApi.geometry.getCoordinates()[1];
    marker.balloonContentBody = markerYApi.properties.get('balloonContentBody');
    marker.iconContent = markerYApi.properties.get('iconContent');
    this.ref.detectChanges();
  }

  getGeoCodeAndSetProperties(markerApi : any, marker: Marker){
    let coord = markerApi.geometry.getCoordinates();
    let Geocoder = ymaps.geocode(coord);
		Geocoder.then( (res) => {
        let object = res.geoObjects.get(0);
        let text = object.properties.get('text').split(',').pop();
        markerApi.properties.set('balloonContentHeader', text);
        markerApi.properties.set('balloonContentBody', object.properties.get('text'));
        markerApi.properties.set('iconContent', text);
        markerApi.properties.set('iconCaption', text);
        this.updateSyncDataOfMarker(markerApi, marker);
			},
			(err) => {
				alert('Ошибка получения гео кода');
			}
		);
  }

  getGeoCodeAndSetPropertiesForLoadFromServer(markerApi : any, marker: Marker){
    let coord = markerApi.geometry.getCoordinates();
    let Geocoder = ymaps.geocode(coord);
    Geocoder.then( (res) => {
        let object = res.geoObjects.get(0);
        let text = object.properties.get('text').split(',').pop();
        markerApi.properties.set('balloonContentHeader', marker.iconContent);
        markerApi.properties.set('balloonContentBody', object.properties.get('text'));
        markerApi.properties.set('iconContent', marker.iconContent);
        markerApi.properties.set('iconCaption', marker.iconContent);
        marker.balloonContentBody = markerApi.properties.get('balloonContentBody');
        this.ref.detectChanges();
        this.updateMarkFromServer(marker);
      },
      (err) => {
        alert('Ошибка получения гео кода');
      }
    );
  }

  saveMarkToTable(marker : Marker){
    let mark: Marker = {
       latitude: marker.latitude,
       longitude: marker.longitude,
       balloonContentBody: marker.balloonContentBody,
       iconContent: marker.iconContent,
       preset: marker.preset,
       draggable: false,
       refMarkApi: ''
    }
    this.saveMarkToServer(mark).then( res => {
      marker.id = res.id;
      mark.id = res.id
      this.markers.push(mark);
      this.ref.detectChanges();
      this.drawMarkerOnMap(mark);
      marker.refMarkApi.options.set('visible', false);
    });
  }

  deleteMarkFromTable(marker: Marker){
    this.deleteMarkFromServer(marker.id);
    let index = this.markers.findIndex( obj => obj.id == marker.id );

    if(marker.id === this.selectedMark.id){
      this.isSaveSelectedMarker = false;
      this.selectedMark.refMarkApi.options.set('visible', true);
    }
    if(marker.id === this.searchMark.id){
      this.isSaveSearchMarker = false;
      this.searchMark.refMarkApi.options.set('visible', true);
    }
    this.clearMarkerOnMap(this.markers[index]);
    this.markers.splice(index, 1);
    this.ref.detectChanges();
  }

  saveSelectedMark(){
    this.isSaveSelectedMarker = true;
    this.saveMarkToTable(this.selectedMark);
  }

  deleteSelectedMark(){
    this.isSaveSelectedMarker = false;
    this.deleteMarkFromTable(this.selectedMark);
  }

  saveSearchMark(){
    this.isSaveSearchMarker = true;
    this.saveMarkToTable(this.searchMark);
  }

  deleteSearchMark(){
    this.isSaveSearchMarker = false;
    this.deleteMarkFromTable(this.searchMark);
  }

  logArrForEach(){
    this.markers.forEach((item, i, arr) =>{
        console.log("item: " + item.iconContent + ", i: " + i + ", id: " + item.id);
    });
  }

  toSearchMarker(form: NgForm){
    this.submittedForm = true;
    this.isSaveSearchMarker = false;
    this.searchMark.preset = 'islands#darkBlueDotIconWithCaption';
    this.searchMark.latitude = form.value.lat;
    this.searchMark.longitude= form.value.lng;
    this.searchMarkYApi.options.set('visible', true);
    this.searchMarkYApi.geometry.setCoordinates([this.searchMark.latitude, this.searchMark.longitude]);
    this.myMap.setCenter([this.searchMark.latitude, this.searchMark.longitude]);
    this.getGeoCodeAndSetProperties(this.searchMarkYApi, this.searchMark);
  }

  drawCustomIconForMark(marker: Marker){
    marker.refMarkApi.options.unset('iconLayout');
    if(marker.pathToIcon != '' && marker.pathToIcon != null){
      marker.refMarkApi.options.set('iconLayout', 'default#image');
      marker.refMarkApi.options.set('iconImageHref', marker.pathToIcon);
      marker.refMarkApi.options.set('iconImageSize', [50, 50]);
    }
  }

  onClickButtonModalForm(marker: Marker){
    this.updateMarkFromServer(marker);
  }

  getMarksFromServer(){
    this.markService.getMarksFromServer().then((res)=>{
      res.forEach( (mark) => {
        let m : Marker = {
          id: mark.id,
          latitude: mark.latitude,
          longitude: mark.longitude,
          iconContent: mark.name,
          balloonContentBody: '',
          preset: 'islands#darkBlueDotIconWithCaption',
          pathToIcon: mark.pathToIcon
        }
        this.markers.push(m);
      });
      this.drawMarkersOnMap();
      this.markers.forEach( (mark) => {
        this.drawCustomIconForMark(mark);
    		this.getGeoCodeAndSetPropertiesForLoadFromServer(mark.refMarkApi, mark);
      });
    });
  }

  saveMarkToServer(marker : Marker) : Promise<any> {
    return this.markService.saveMarkToServer(marker);
  }

  deleteMarkFromServer(id : number){
    this.markService.deleteMarkFromServer(id);
  }

  updateMarkFromServer(marker: Marker) : Promise<any>{
    return this.markService.updateMarkFromServer(marker);
  }

  getModalFormForMark(marker: Marker){
    this.selectedMarkForModalForm = marker;
    this.ref.detectChanges();
  }

  downloadPdfFile(){
    this.markService.downloadListOfMarks().subscribe( blob => {
      FileSaver.saveAs(blob, "Marks.pdf");
    });
  }

  getUserNameSession(){
    this.markService.getNameUser().then( (res) => {
      this.currentUserName = res._body;
    });
  }

}
