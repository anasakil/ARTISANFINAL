import React, {  useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { BaseLayer } = LayersControl;

const moroccoRegions = require('./moroccoRegions.json');

const MoroccoMap = () => {
 

  const navigate = useNavigate(); 
  const geoJsonLayer = useRef(null);

  const regionColors = {
    "Tanger-Tetouan-Al Hoceima": "#ff6347",
    "Oriental": "#4682b4",
    "Fès-Meknès": "#32cd32",
    "Rabat-Salé-Kénitra": "#ff4500",
    "Béni Mellal-Khénifra": "#daa520",
    "Casablanca-Settat": "#40e0d0",
    "Marrakech-Safi": "#ff69b4",
    "Drâa-Tafilalet": "#6495ed",
    "Souss-Massa": "#ffa500",
    "Guelmim-Oued Noun": "#9acd32",
    "Laâyoune-Sakia El Hamra": "#8a2be2",
    "Dakhla-Oued Ed-Dahab": "#0D4B79"
  };

  const mapStyle = (feature) => ({
    fillColor: regionColors[feature.properties.region] || "#ff0000",
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  });

  const highlightFeature = (e) => {
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  const resetHighlight = (e) => {
    geoJsonLayer.current.resetStyle(e.target);
  };

  const onRegionClick = (feature) => {
    navigate(`/products/${feature.properties.region}`);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => onRegionClick(feature),
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
    layer.bindTooltip(feature.properties.region, { 
      permanent: false, 
      direction: 'auto'
    });
  };

  return (
    <MapContainer center={[31.7917, -7.0926]} zoom={5} scrollWheelZoom={true} style={{ height: '90vh', width: '100%' }}>
      <LayersControl position="topright">
        <BaseLayer name="Esri Aerial" checked>
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
        <BaseLayer name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
      </LayersControl>
      <GeoJSON
        data={moroccoRegions}
        style={mapStyle}
        onEachFeature={onEachFeature}
        ref={geoJsonLayer}
      />
    </MapContainer>
  );
};

export default MoroccoMap;
