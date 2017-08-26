import { Marker } from './marker';

export const MARKERS: Marker[] = [{
    id : 0,
    coordinates: [55.75, 37.61],
    balloonContentBody: "Столица России",
    iconContent: "Москва",
    preset: "islands#redDotIcon",
    draggable: true,
    refMarkApi : ''
  },
  {
    id : 1,
    coordinates: [55.847, 38.6],
    balloonContentBody: '',
    iconContent: "ЦУМ",
    preset: 	'islands#violetStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 2,
    coordinates: [55.847, 37.6],
    balloonContentBody: '',
    iconContent: "Volna",
    preset: 	'islands#violetStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 3,
    coordinates: [55.547, 37.2],
    balloonContentBody: '',
    iconContent: "Caviarclothes",
    preset: 	'twirl#greyStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 4,
    coordinates: [55.247, 35.2],
    balloonContentBody: '',
    iconContent: "Rodina",
    preset: 	'twirl#brownStretchyIcon',
    draggable: false,
    refMarkApi : ''
  },
  {
    id : 5,
    coordinates: [55.347, 37.0],
    balloonContentBody: '',
    iconContent: "Brandshop",
    preset: 	'islands#oliveStretchyIcon',
    draggable: false,
    refMarkApi : ''
  }
];
