"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

interface Gempa {
  jam: string;
  tanggal: string;
  lokasi: string;
  magnitudo: number;
  kedalaman: number;
  shakemap?: string;
}

export default function Gempa() {
  const [gempa, setGempa] = useState<Gempa | null>(null);

  useEffect(() => {
    async function fetchGempa() {
      try {
        const response = await fetch(
          "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
        );
        const data = await response.json();
        const g = data.Infogempa.gempa;

        setGempa({
          tanggal: g.Tanggal,
          jam: g.Jam,
          lokasi: g.Wilayah,
          magnitudo: parseFloat(g.Magnitude),
          kedalaman: parseFloat(g.Kedalaman),
          shakemap: g.Shakemap
            ? `https://data.bmkg.go.id/DataMKG/TEWS/${g.Shakemap}`
            : undefined,
        });
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    }

    fetchGempa();
  }, []);

  if (!gempa) return null;

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="px-4 py-2">
          <h1 className="text-4xl font-extrabold text-red-700">
            GEMPA TERBARU
          </h1>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-row">
        <div className="flex-1 my-auto gap-2 ml-4">
          <p className="text-2xl mb-4">
            <strong>Tanggal:</strong> <br /> {gempa.tanggal}
          </p>
          <p className="text-2xl mb-4">
            <strong>Jam:</strong> <br />
            {gempa.jam}
          </p>
          <p className="text-2xl mb-4">
            <strong>Lokasi:</strong>
            <br /> {gempa.lokasi}
          </p>
          <p className="text-2xl mb-4">
            <strong>Magnitudo:</strong>
            <br /> {gempa.magnitudo} SR
          </p>
          <p className="text-2xl mb-4">
            <strong>Kedalaman:</strong>
            <br /> {gempa.kedalaman} km
          </p>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Image
            src={gempa.shakemap || ""}
            alt="Shakemap"
            width={400}
            height={150}
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
