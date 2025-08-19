"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { MapPinned } from "lucide-react";
import { usePosisi } from "@/lib/posisi";

export default function Posisi() {
  const { position, alamat } = usePosisi();
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
