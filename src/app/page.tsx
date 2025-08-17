"use client";

import dynamic from "next/dynamic";
import AirQuality from "@/components/AirQuality";
import Posisi from "@/components/Posisi";
import Weather from "@/components/Weather";
import Navbar from "@/components/Navbar";
import Forecast from "@/components/Forecast";

const Maps = dynamic(() => import("@/components/Map"), {
  loading: () => <p>A map is loading...</p>,
  ssr: false,
});

export default function Page() {
  return (
    <div className="p-4 pt-18">
      <Navbar />
      <div className="flex flex-col p-2 justify-between items-center gap-5">
        <Posisi />
        <Maps />
        <div className="flex md:flex-row flex-col w-full gap-5">
          <div className="flex-1">
            <AirQuality />
          </div>
          <div className="flex-1">
            <Weather />
          </div>
          <div className="hidden flex-1">
            <Forecast />
          </div>
        </div>
      </div>
      <div className="p-2 flex">
        <Forecast />
      </div>
    </div>
  );
}
