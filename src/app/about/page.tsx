import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4 pt-18">
      <Navbar />
      <div className="flex flex-col p-2 justify-between items-center gap-5">
        <Card className="w-full h-full">
          <h1 className="text-2xl font-bold text-center">
            About 0xta Forecast
          </h1>
          <p className="text-lg mt-2 px-6">
            This website provides real time weather information and forecasts
            for your location. It uses the Google Weather API to fetch current
            weather conditions, including temperature, humidity, wind speed, and
            more. The site also displays your current geographical position
            using the Google Maps API.
          </p>
          <p className="text-lg mt-2 px-6">
            Created by{" "}
            <Link
              className="text-blue-400 text-semibold text-lg"
              href={"https://0xta.my.id"}
            >
              Oktavian Putra Iswandika
            </Link>{" "}
          </p>
        </Card>
      </div>
    </div>
  );
}
