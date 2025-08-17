"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CloudSunRain } from "lucide-react";

interface Cuaca {
  cuaca?: string;
  suhu?: number;
  kelembapan?: number;
  kecepatanAngin?: number;
}

export default function Weather() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const [cuaca, setCuaca] = useState<Cuaca | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

      setPosition([lat, long]);

      const response = await fetch(
        `https://weather.googleapis.com/v1/currentConditions:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${long}&languageCode=id`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setCuaca({
        cuaca: data.weatherCondition.description.text,
        suhu: data.temperature.degrees,
        kelembapan: data.relativeHumidity,
        kecepatanAngin: data.wind.speed.value,
      });
    });
  }, []);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold">Cuaca</h1>
          <CloudSunRain size={32} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {position ? (
          <div>
            <p className="text-xl font-extrabold mb-3">{cuaca?.cuaca}</p>
            <h3 className="text-lg font-semibold mt-2">Temperatur</h3>
            <p className="text-2xl font-bold mb-2">
              {cuaca?.suhu}
              <span className="text-md ml-1">°C</span>
            </p>
            <h3 className="text-lg font-semibold mt-2">Kelembaban</h3>
            <p className="text-2xl font-bold mb-2">
              {cuaca?.kelembapan}
              <span className="text-md ml-1">%</span>
            </p>
            <h3 className="text-lg font-semibold mt-2">Kecepatan Angin</h3>
            <p className="text-2xl font-bold mb-2">
              {cuaca?.kecepatanAngin}
              <span className="text-md ml-1">Km/h</span>
            </p>
          </div>
        ) : (
          <p>Mencari lokasi...</p>
        )}
      </CardContent>
    </Card>
  );
}
