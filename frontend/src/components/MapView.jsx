import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers, Eye, Info, Sparkles, MapPin } from 'lucide-react';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper component to smoothly re-center map
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ 
  location, 
  detectedRegions = [], 
  activeLayer = 'Detected Change',
  selectedRegionId = null,
  onSelectRegion = () => {}
}) {
  const center = [location?.lat || 10.7870, location?.lng || 79.1378];
  const zoom = location?.zoom || 12;

  // Custom marker icon
  const customIcon = new L.DivIcon({
    className: 'custom-map-marker',
    html: `<div style="background-color: #00b4d8; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 12px #00b4d8;"></div>`
  });

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-[#090f1d]">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        className="w-full h-full z-10"
      >
        <MapController center={center} zoom={zoom} />
        
        {/* Esri World Imagery Satellite Tile Layer */}
        <TileLayer
          attribution='&copy; ISRO Bhuvan / Esri World Imagery'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Optional overlay simulation based on active layer */}
        {activeLayer === 'NDVI Change' && (
          <TileLayer
            opacity={0.45}
            url="https://stamen-tiles.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}.png"
          />
        )}

        {/* Center Pin */}
        <Marker position={center} icon={customIcon}>
          <Popup>
            <div className="text-xs p-1">
              <strong className="text-cyan-400 font-bold block">{location?.name || "Study Center"}</strong>
              <span className="text-slate-300">Lat: {location?.lat?.toFixed(4)}, Lng: {location?.lng?.toFixed(4)}</span>
            </div>
          </Popup>
        </Marker>

        {/* Detected GeoJSON Regions */}
        {detectedRegions.map((region) => {
          const isSelected = region.id === selectedRegionId;
          const coords = region.geojson?.geometry?.coordinates[0].map(([lng, lat]) => [lat, lng]);

          if (!coords) return null;

          const isWater = region.change_type === 'Water Expansion';
          const isUrban = region.change_type === 'Urban Expansion';
          
          let fillColor = '#ef4444'; // default red for vegetation loss
          if (isWater) fillColor = '#3b82f6';
          if (isUrban) fillColor = '#f59e0b';

          return (
            <Polygon
              key={region.id}
              positions={coords}
              pathOptions={{
                color: isSelected ? '#00b4d8' : fillColor,
                weight: isSelected ? 3 : 2,
                fillColor: fillColor,
                fillOpacity: isSelected ? 0.65 : 0.45,
                dashArray: isSelected ? '4' : null
              }}
              eventHandlers={{
                click: () => onSelectRegion(region)
              }}
            >
              <Popup>
                <div className="p-2 text-xs space-y-2 max-w-xs">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                    <span className="font-bold text-cyan-400 text-sm">{region.region_name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {region.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Change Type:</span>
                      <span className="font-semibold text-white">{region.change_type}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Area:</span>
                      <span className="font-semibold text-white">{region.area_sqkm} km²</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">NDVI Difference:</span>
                      <span className={`font-mono font-bold ${region.ndvi_diff < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {region.ndvi_diff > 0 ? `+${region.ndvi_diff}` : region.ndvi_diff}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">NDWI Difference:</span>
                      <span className="font-mono font-bold text-cyan-300">
                        {region.ndwi_diff > 0 ? `+${region.ndwi_diff}` : region.ndwi_diff}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-1.5 rounded text-[10px] text-slate-300 border border-slate-800">
                    <strong className="text-slate-400">Method:</strong> {region.detection_method}
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Map Control Overlay */}
      <div className="absolute top-3 right-3 z-20 bg-slate-900/90 border border-slate-800 backdrop-blur-md p-2 rounded-xl text-xs flex items-center gap-2 shadow-lg">
        <Layers className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-semibold text-slate-300 text-[11px]">Layer:</span>
        <span className="font-mono text-cyan-300 text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          {activeLayer}
        </span>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-slate-900/90 border border-slate-800 backdrop-blur-md p-2.5 rounded-xl text-xs space-y-1.5 shadow-lg">
        <div className="font-bold text-slate-300 text-[11px] border-b border-slate-800 pb-1">Change Intensity</div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-3 h-3 rounded-sm bg-red-500/80 inline-block"></span>
          <span className="text-slate-300">Vegetation Loss</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-3 h-3 rounded-sm bg-blue-500/80 inline-block"></span>
          <span className="text-slate-300">Water Expansion</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-3 h-3 rounded-sm bg-amber-500/80 inline-block"></span>
          <span className="text-slate-300">Urban Clearing</span>
        </div>
      </div>
    </div>
  );
}
