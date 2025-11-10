// import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import type { Coords } from "../types";
// import { useEffect } from "react";
// import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";


// const API_KEY = import.meta.env.VITE_API_KEY;
// const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_KEY;

// type Props = {
//   coords: Coords;
//   onMapClick: (lat: number, lon: number) => void;
//   mapType: string;
// };

// export default function Map({ coords, onMapClick, mapType }: Props) {
//   const { lat, lon } = coords;
//   return (
//     <MapContainer
//       center={[lat, lon]}
//       zoom={5}
//       style={{ width: "100%", height: "100%" }}
//     >
//       <MapClick onMapClick={onMapClick} coords={coords} />
//       <MapTileLayer />
//       <TileLayer
//         opacity={0.7}
//         url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
//       />
//       <Marker position={[lat, lon]} />
//     </MapContainer>
//   );
// }

// function MapClick({
//   onMapClick,
//   coords,
// }: {
//   onMapClick: (lat: number, lon: number) => void;
//   coords: Coords;
// }) {
//   const map = useMap();
//   map.panTo([coords.lat, coords.lon]);

//   map.on("click", (e) => {
//     const { lat, lng } = e.latlng;
//     onMapClick(lat, lng);
//   });

//   return null;
// }

// function MapTileLayer() {
//   const map = useMap();

//   useEffect(() => {
//     const tileLayer = new MaptilerLayer({
//       style: "streets-v2",
//       apiKey: MAPTILER_API_KEY,
//     });
//     tileLayer.addTo(map);

//     return () => {
//       map.removeLayer(tileLayer);
//     };
//   }, [map]);

//   return null;
// }

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";
import { useEffect } from "react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// 🧩 Fix for missing marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API_KEY = import.meta.env.VITE_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_KEY;

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

export default function Map({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      <MapTileLayer />
      <TileLayer
        opacity={0.7}
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
}

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "streets-v2",
      apiKey: MAPTILER_API_KEY,
    });
    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
}
