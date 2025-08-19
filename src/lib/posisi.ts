import { useState, useEffect } from "react";

interface Alamat {
  alamat: string;
}

export function usePosisi() {
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

      if (data.results && data.results.length > 0) {
        const comps = data.results[0].address_components;
        const dusun = comps[1]?.long_name ?? "";
        const desa = comps[2]?.long_name ?? "";
        const kecamatan = comps[3]?.long_name ?? "";
        const kota = comps[4]?.long_name ?? "";
        const provinsi = comps[5]?.long_name ?? "";
        const kodePos = comps[7]?.long_name ?? "";
        const alamatStr = `${dusun}, ${desa}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`;
        setAlamat({ alamat: alamatStr });
      }
    });
  }, []);

  return { position, alamat };
}
