"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { MapPinned } from "lucide-react";

interface Alamat {
  alamat?: string;
}

export default function Posisi() {
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
      const dusun = data.results[0].address_components[1].long_name;
      const desa = data.results[0].address_components[2].long_name;
      const kecamatan = data.results[0].address_components[3].long_name;
      const kota = data.results[0].address_components[4].long_name;
      const provinsi = data.results[0].address_components[5].long_name;
      const kodePos = data.results[0].address_components[7].long_name;
      const alamat = `${dusun}, ${desa}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`;
      //   console.log(data.results[0]);
      setAlamat({
        alamat: alamat,
      });
    });
  }, []);

  return (
    <Card className="w-full h-full">
      <CardTitle className="flex gap-2 items-center">
        <h1 className="text-2xl font-extrabold pl-5">Lokasi Kamu</h1>
        <MapPinned size={32} />
      </CardTitle>
      <CardContent>
        {position ? (
          <div>
            <p>Latitude:</p>
            <p className="text-lg font-semibold mb-2">{position[0]}</p>
            <p>Longitude:</p>
            <p className="text-lg font-semibold mb-2">{position[1]}</p>
            <p>Alamat:</p>
            <p className="text-lg font-semibold mb-2">{alamat?.alamat}</p>
          </div>
        ) : (
          <p>Mencari lokasi...</p>
        )}
      </CardContent>
    </Card>
  );
}
