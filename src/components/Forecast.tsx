"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { CloudSunRain } from "lucide-react";
import { format } from "path";

interface Cuaca {
  cuaca?: string;
  suhu?: number;
  kelembapan?: number;
  kecepatanAngin?: number;
  propHujan?: number;
}

export default function Forecast() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const [cuaca, setCuaca] = useState<Cuaca | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;

      setPosition([lat, long]);

      const response = await fetch(
        `https://weather.googleapis.com/v1/forecast/days:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${long}&languageCode=id`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCuaca({
        cuaca:
          data.forecastDays[1].daytimeForecast.weatherCondition.description
            .text,
        suhu:
          (data.forecastDays[1].minTemperature.degrees +
            data.forecastDays[1].maxTemperature.degrees) /
          2,
        kelembapan: data.forecastDays[1].daytimeForecast.relativeHumidity,
        kecepatanAngin: data.forecastDays[1].daytimeForecast.wind.speed.value,
        propHujan:
          data.forecastDays[1].daytimeForecast.precipitation.probability
            .percent,
      });
    });
  }, []);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="relative gap-2 items-center">
          <h1 className="text-2xl font-bold text-center">
            Perkiraan Cuaca{" "}
            <span className="ml-1">
              {`${tomorrow.getDate().toString().padStart(2, "0")}/${(
                tomorrow.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}/${tomorrow.getFullYear()}`}
            </span>
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {position ? (
          <div className="md:flex md:flex-cols-2 md:justify-around items-center">
            <div>
              <p className="text-2xl font-extrabold mb-3">{cuaca?.cuaca}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-2">Suhu</h3>
              <p className="text-2xl font-bold mb-2">
                {cuaca?.suhu}
                <span className="text-md ml-1">°C</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-2">Kelembaban</h3>
              <p className="text-2xl font-bold mb-2">
                {cuaca?.kelembapan}
                <span className="text-md ml-1">%</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-2">Kecepatan Angin</h3>
              <p className="text-2xl font-bold mb-2">
                {cuaca?.kecepatanAngin}
                <span className="text-md ml-1">Km/h</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-2">Kemungkinan Hujan</h3>
              <p className="text-2xl font-bold mb-2">
                {cuaca?.propHujan}
                <span className="text-md ml-1">%</span>
              </p>
            </div>
          </div>
        ) : (
          <p>Mencari lokasi...</p>
        )}
      </CardContent>
    </Card>
  );
}
