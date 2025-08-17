"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Wind } from "lucide-react";

export default function AirQuality() {
  const [airQuality, setAirQuality] = useState<any | null>(null);
  const [position, setPosition] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting position:", error);
        setPosition({ lat: -6.17511, long: 106.865039 });
      }
    );
  }, []);

  useEffect(() => {
    if (!position) return;

    const fetchAirQuality = async () => {
      try {
        const response = await fetch(
          `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location: {
                latitude: position.lat,
                longitude: position.long,
              },
              extraComputations: ["HEALTH_RECOMMENDATIONS"],
              languageCode: "id",
            }),
          }
        );

        const data = await response.json();
        // console.log(data);
        setAirQuality({
          aqi: data.indexes[0].aqi,
          kategori: data.indexes[0].category,
          rekomendasi: data.healthRecommendations.generalPopulation,
        });
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    fetchAirQuality();
  }, [position, apiKey]);

  return (
    <div>
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">Kualitas Udara</h1>
            <Wind size={32} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          {airQuality ? (
            <>
              <p className="text-xl font-bold mb-2">AQI: {airQuality.aqi}</p>
              <h3 className="text-lg font-semibold mt-2">Kategori</h3>
              <p className="text-lg">{airQuality.kategori}</p>
              <h3 className="text-lg font-semibold mt-2">
                Rekomendasi Kesehatan
              </h3>
              <p className="text-lg">{airQuality.rekomendasi}</p>
            </>
          ) : (
            <p>Mengambil data kualitas udara...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
