import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon for Leaflet (React context issue)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor to bottom
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapPicker = ({ onLocationChange }) => {
  // Default coordinates for Dhaka
  const [position, setPosition] = useState([23.8103, 90.4125]); // Dhaka coordinates

  // Map click event handler
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddress(e.latlng.lat, e.latlng.lng);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  // Fetch address using OpenStreetMap Nominatim API
  const fetchAddress = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    const address = data.display_name || "Unknown location";
    onLocationChange({ lat, lng, address });
  };

  return (
    <div className="w-full h-full">
      <MapContainer center={position} zoom={13} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
