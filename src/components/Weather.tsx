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
      setPosition([lat, long]);

      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
        if (!apiKey) {
          console.error("API Key tidak ditemukan!");
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=id`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Weather API result:", data);

        setCuaca({
          cuaca: data.weather?.[0]?.description ?? "Tidak ada data",
          suhu: data.main?.temp,
          kelembapan: data.main?.humidity,
          kecepatanAngin: parseFloat((data.wind?.speed * 3.6).toFixed(1)),
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  }, []);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold">Cuaca Sekarang</h1>
          <CloudSunRain size={32} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {position ? (
          <div>
            <p className="text-xl font-extrabold mb-3 capitalize">
              {cuaca?.cuaca}
            </p>

            <h3 className="text-lg font-semibold mt-2">Temperatur</h3>
            <p className="text-2xl font-bold mb-2">
              {cuaca?.suhu} <span className="text-md ml-1">°C</span>
            </p>

            <h3 className="text-lg font-semibold mt-2">Kelembaban</h3>
            <p className="text-2xl font-bold mb-2">
              {cuaca?.kelembapan} <span className="text-md ml-1">%</span>
            </p>

            <h3 className="text-lg font-semibold mt-2">Kecepatan Angin</h3>
            <p className="text-2xl font-bold mb-2">
              {cuaca?.kecepatanAngin} <span className="text-md ml-1">Km/h</span>
            </p>
          </div>
        ) : (
          <p>Mencari lokasi...</p>
        )}
      </CardContent>
    </Card>
  );
}
