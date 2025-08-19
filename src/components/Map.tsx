"use client";

import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";

export default function Map() {
  const [position, setPosition] = useState<[number, number] | null>(null);

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
    });
  }, []);

  if (!position) return <p>Mencari lokasi...</p>;

  return (
    <Card className="w-full z-0">
      <CardContent>
        <div className="rounded-lg border-2 border-gray-400">
          <iframe
            width="100%"
            height="400"
            loading="lazy"
            style={{ border: 0 }}
            className="rounded-lg"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&q=${position[0]},${position[1]}&zoom=15`}
            allowFullScreen
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
