import { Component , OnInit, ChangeDetectorRef} from '@angular/core';
import { NgForm} from '@angular/forms';

import { Marker } from './marker';
import { MarkService } from './mark.service';
import { WindowRef } from './window-ref';

declare var ymaps: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'title';

   markers : Marker[] = [];
   myMap : any;
   selectedMarkYApi : any;
   searchMarkYApi : any;
   selectedMark : Marker = new Marker();
   searchMark: Marker = new Marker();

   submittedForm: boolean = false;
   isSaveSelectedMarker: boolean = false;
   isSaveSearchMarker: boolean = false;

   constructor(private markService: MarkService, private win: WindowRef, private ref: ChangeDetectorRef){
     //ref.detach();
     console.log('Window object', win.nativeWindow);
    // this.ymaps = this.win.nativeWindow.ymaps;
   }


  ngOnInit(): void {
    var that = this;

    ymaps.ready(function init() {
       that.myMap = new ymaps.Map("map", {
         center: [55.76, 37.64],
         zoom: 7,
         controls: []
       });
       that.selectedMarkYApi = new ymaps.Placemark([], {
             }, {
               preset: "islands#blueDotIconWithCaption",
               draggable: true,
               visible: false
             }
        );
        that.searchMarkYApi = new ymaps.Placemark([], {
              }, {
                preset: "islands#blueDotIconWithCaption",
                draggable: false,
                visible: false
              }
         );
       that.myMap.geoObjects.add(that.selectedMarkYApi);
       that.myMap.geoObjects.add(that.searchMarkYApi);

       //console.log("myMap: " + that.myMap);
       that.registrationEventClickOnMap();
       that.registrationEventDragEnd();

       that.markService.getMarks().then( (markers) => {
         that.markers = markers;
         that.ref.detectChanges();
         that.drawMarkersOnMap();
       });
    });

  }


  drawMarkersOnMap(){
    //console.log("markers: " + this.markers);
    //console.log("ymaps: " + ymaps);
    //console.log("myMap: " + this.myMap);
    this.markers.forEach((item, i, arr) =>{
      this.drawMarkerOnMap(item);
    });
  }

  drawMarkerOnMap(marker : Marker){
    var mark = new ymaps.Placemark(marker.coordinates, {
      balloonContentHeader: marker.iconContent,
      balloonContentBody: marker.balloonContentBody,
      iconContent: marker.iconContent,
      iconCaption: marker.iconContent,
    }, {
      preset: marker.preset,
      draggable: marker.draggable
    });
    marker.refMarkApi = mark;
    this.myMap.geoObjects.add(mark);
  }

  clearMarkerOnMap(marker : Marker){
    console.log("ref: " + marker.refMarkApi + ", name: " + marker.iconContent);
    this.myMap.geoObjects.remove(marker.refMarkApi);
  }

  registrationEventClickOnMap(){
    this.myMap.events.add('click', (e) =>{
      this.selectedMark.preset = 'islands#orangeDotIconWithCaption';
      this.isSaveSelectedMarker = false;
      this.selectedMarkYApi.options.set('visible', true);
      this.selectedMarkYApi.geometry.setCoordinates(e.get('coords'));
      this.getGeoCodeAndSetProperties(this.selectedMarkYApi, this.selectedMark);
      //console.log(this.selectedMark.iconContent);
      //console.log('click on YM set prop mark: ' + this.selectedMarkYApi.properties.get('iconContent'));
    });
  }

  registrationEventDragEnd(){
    //console.log(this.selectedMarkYApi);
    this.selectedMarkYApi.events.add('dragend', (e) =>{
      this.isSaveSelectedMarker = false;
      this.getGeoCodeAndSetProperties(this.selectedMarkYApi, this.selectedMark);
    });
  }

  updateSyncDataOfMarker(markerYApi: any, marker: Marker){
    marker.coordinates = markerYApi.geometry.getCoordinates();
    marker.balloonContentBody = markerYApi.properties.get('balloonContentBody');
    marker.iconContent = markerYApi.properties.get('iconContent');
    this.ref.detectChanges();
    //console.log('update properties marker: ' + marker.iconContent);
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

saveMarkToTable(marker : Marker){
  let m: Marker = {
     id: this.markers.length,
     coordinates: marker.coordinates,
     balloonContentBody: marker.balloonContentBody,
     iconContent: marker.iconContent,
     preset: marker.preset,
     draggable: false,
     refMarkApi: ''
  }
  marker.id = m.id;
  this.drawMarkerOnMap(m);
  this.markers.push(m);
  this.saveMarkToServer(m);
  //console.log(m);
  this.ref.detectChanges();
  //this.logArrForEach();
}

deleteMarkFromTable(marker: Marker){
  let index = this.markers.findIndex( obj => obj.id == marker.id );
  this.clearMarkerOnMap(this.markers[index]);
  //console.log("this.isSaveSelectedMarker "+ this.isSaveSelectedMarker);
  //console.log("this.isSaveSearchMarker "+ this.isSaveSearchMarker);
  if(marker.id == this.selectedMark.id){
    this.isSaveSelectedMarker = false;
  }
  if(marker.id == this.searchMark.id){
    this.isSaveSearchMarker = false;
  }
  //console.log(marker);
  //console.log("and it id: " + index);
  //console.log("this.isSaveSelectedMarker "+ this.isSaveSelectedMarker);
  //console.log("this.isSaveSearchMarker "+ this.isSaveSearchMarker);
  this.markers.splice(index, 1);
  this.ref.detectChanges();
  //this.logArrForEach();
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
  //console.log(!!this.searchMark.coordinates[0] && !!this.searchMark.coordinates[1]);
  this.searchMark.preset = 'islands#orangeDotIconWithCaption';
  this.searchMark.coordinates = [form.value.lat, form.value.lng];
  //console.log(this.searchMark);
  this.searchMarkYApi.options.set('visible', true);
  this.searchMarkYApi.geometry.setCoordinates(this.searchMark.coordinates);
  this.myMap.setCenter(this.searchMark.coordinates);
  this.getGeoCodeAndSetProperties(this.searchMarkYApi, this.searchMark);
}

getData(){
  this.markService.getMarksFromServer().then((res)=>{
    console.log(res);
  });
}

saveMarkToServer(marker : Marker){
  this.markService.saveMarkToServer(marker);
}



}
