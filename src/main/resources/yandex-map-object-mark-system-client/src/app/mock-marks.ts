import { Marker } from './marker';

export const MARKERS: Marker[] = [{
    id : 0,
    latitude: 55.75,
    longitude: 37.61,
    balloonContentBody: "Столица России",
    iconContent: "Москва",
    preset: "islands#redDotIcon",
    draggable: true,
    refMarkApi : ''
  },
  {
    id : 1,
    latitude: 55.847,
    longitude: 38.6,
    balloonContentBody: '',
    iconContent: "ЦУМ",
    preset: 	'islands#violetStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 2,
    latitude: 55.847,
    longitude: 37.6,
    balloonContentBody: '',
    iconContent: "Volna",
    preset: 	'islands#violetStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 3,
    latitude: 55.547,
    longitude: 37.2,
    balloonContentBody: '',
    iconContent: "Caviarclothes",
    preset: 	'islands#greyStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 4,
    latitude: 55.247,
    longitude: 35.2,
    balloonContentBody: '',
    iconContent: "Rodina",
    preset: 	'islands#brownStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 5,
    latitude: 55.347,
    longitude: 37.0,
    balloonContentBody: '',
    iconContent: "Brandshop",
    preset: 	'islands#oliveStretchyIcon',
    draggable: false,
    refMarkApi : ''
  }
];
