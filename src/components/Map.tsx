"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";

interface Alamat {
  village?: string;
  suburb?: string;
  city?: string;
}

export default function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [alamat, setAlamat] = useState<Alamat | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

      setPosition([lat, long]);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`
      );
      const data = await response.json();
      const desa = data.results[0].address_components[2].long_name;
      const kecamatan = data.results[0].address_components[3].long_name;
      const kota = data.results[0].address_components[4].long_name;
      // console.log(data.results[0]);
      setAlamat({
        village: desa,
        suburb: kecamatan,
        city: kota,
      });
    });
  }, []);

  if (!position) return <p>Mencari lokasi...</p>;

  return (
    <Card className="w-full z-0">
      <CardContent>
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "400px", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {alamat?.village}, {alamat?.suburb}, {alamat?.city}
            </Popup>
          </Marker>
        </MapContainer>
      </CardContent>
    </Card>
  );
}
