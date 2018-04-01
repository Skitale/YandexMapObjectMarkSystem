import { Component , OnInit, ViewChild, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Marker } from './marker';
import { Icon } from './icon';
import { ICONS } from './icons-for-marks';

import { WindowRef } from './window-ref';
declare var $: any;


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal.form.component.html',
  styleUrls: ['./modal.form.component.css']
})
export class ModalFormComponent implements OnInit, OnChanges {

  @ViewChild("modalForm")
  modalForm: NgForm;

  @Input()
  marker: Marker;

  @Input()
  markers: Marker[];

  @Output() readyForm = new EventEmitter<Marker>();

  @Output() markerChange = new EventEmitter<Marker>();

  icons: Icon[] = [];


  constructor(){}

  ngOnInit(): void {
    this.icons = ICONS;
  }

  ngOnChanges(): void {
    if(!!this.marker){
      //console.log(this.marker);
      this.modalForm.controls['idMark'].setValue(this.marker.id);
      this.modalForm.controls['nameMark'].setValue(this.marker.iconContent);
      this.modalForm.controls['latMark'].setValue(this.marker.latitude);
      this.modalForm.controls['lngMark'].setValue(this.marker.longitude);
      this.modalForm.controls['addressMark'].setValue(this.marker.balloonContentBody);
      if(this.marker.pathToIcon != null && this.marker.pathToIcon != ''){
        let selectIcon = this.icons.find((item) => {
          if(item.path === this.marker.pathToIcon){
            return true;
          }
        });
        //обновление combox'а в соответствии с нажатой маркой в таблице
        $("div.btn-group button.btn span.filter-option")
          .html("<img width='20' height='20' src='" + selectIcon.path + "'>" + selectIcon.name);
        this.modalForm.controls['iconOption'].setValue(selectIcon.name);
      } else {
        $("div.btn-group button.btn span.filter-option")
          .html("<img width='20' height='20' src=''> Standard icon");
        this.modalForm.controls['iconOption'].setValue('Standard icon');
      }
      $("#ModalFormChangeProp").modal('show');
    }
  }

  closeForm(){
    this.markerChange.emit(null);
  }

  changeFieldMark(form: NgForm){
    //console.log(form.value);
    let selectIcon = this.icons.find((item) => {
      if(item.name === form.value.iconOption){
        return true;
      }
    });
    let pathToImg = selectIcon.path;
    let index = this.markers.findIndex( ind => ind.id == form.value.idMark);
    this.markers[index].iconContent = form.value.nameMark;
    this.markers[index].pathToIcon = pathToImg;

    let m: Marker = {
       id: form.value.idMark,
       latitude: this.markers[index].latitude,
       longitude: this.markers[index].longitude,
       balloonContentBody: this.markers[index].balloonContentBody,
       iconContent: this.markers[index].iconContent,
       pathToIcon: this.markers[index].pathToIcon,
    }

    this.drawCustomIconForMark(this.markers[index]);
    this.markers[index].refMarkApi.properties.set('balloonContentHeader', this.markers[index].iconContent);
    this.markers[index].refMarkApi.properties.set('iconContent', this.markers[index].iconContent);
    this.markers[index].refMarkApi.properties.set('iconCaption', this.markers[index].iconContent);
    this.markers[index].refMarkApi.options.set('preset', this.markers[index].preset);

    this.readyForm.emit(m);
    $("#ModalFormChangeProp").modal('hide');
  }

  drawCustomIconForMark(marker: Marker){
    marker.refMarkApi.options.unset('iconLayout');
    if(marker.pathToIcon != '' && marker.pathToIcon != null){
      marker.refMarkApi.options.set('iconLayout', 'default#image');
      marker.refMarkApi.options.set('iconImageHref', marker.pathToIcon);
      marker.refMarkApi.options.set('iconImageSize', [50, 50]);
    }
  }
}
