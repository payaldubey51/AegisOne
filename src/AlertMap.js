import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function AlertMap({ lat, lng }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{
        height: "300px",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>
          Emergency Alert Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default AlertMap;