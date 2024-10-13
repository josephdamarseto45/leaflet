import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}

  onOnInit() {}

  ionViewDidEnter() {
    // Mengatur tampilan lokasi peta
    this.map = L.map('mapId').setView([-7.7744, 110.3740], 14);

    // Menambahkan TileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png',
      iconSize: [24, 24],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    // Marker 
    const markerUGM = L.marker([-7.7738481733805465, 110.37232784295921], { icon: customIcon }).addTo(this.map);
    const imageUGM = 'https://sv.ugm.ac.id/wp-content/uploads/sites/27/2021/09/Gedung-TILC-scaled.jpg'; // Sesuaikan URL gambar UGM

    markerUGM.bindPopup(`
      <b>Sekolah Vokasi Universitas Gadjah Mada</b><br>
      Fakultas Sekolah Vokasi Universitas Gadjah Mada.<br>
      <img src="${imageUGM}" alt="Universitas Gadjah Mada" style="max-width: 100%; height: auto;"/>
    `).openPopup();

    // Base maps
    const satelliteLayer = L.tileLayer('https://{s}.google.com/vt?x={x}&y={y}&z={z}&s=Ga', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
    });

    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
    });

    // Base maps tambahan
    const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    const stamenWatercolor = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="http://maps.stamen.com/">Stamen Maps</a>'
    });

    const esriTopoLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    });

    const cartoLightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
    });

    // Menambahkan layer satellite sebagai base map awal
    satelliteLayer.addTo(this.map);

    // Menambahkan layer control
    const baseMaps = {
      'Satellite': satelliteLayer,
      'Topographic': topoLayer,
      'OpenStreetMap': osmLayer,
      'CartoDB Dark Matter': cartoDBLayer,
      'Esri World Imagery': esriWorldImagery,
      'Stamen Watercolor': stamenWatercolor,
      'Esri Topographic': esriTopoLayer,
      'CartoDB Light': cartoLightLayer
    };

    L.control.layers(baseMaps).addTo(this.map);
  }
}
