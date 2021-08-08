
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
 const TaxiIcon = new L.Icon({
    iconUrl: '/pin1.png',
    iconRetinaUrl:'/pin1.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    // className: 'leaflet-div-icon'
});
 const TaxiIconSelected = new L.Icon({
    iconUrl: '/pin2.png',
    iconRetinaUrl:'/pin2.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    // className: 'leaflet-div-icon'
});

export  {TaxiIcon,TaxiIconSelected}