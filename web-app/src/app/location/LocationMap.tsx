"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./location.module.css";

const position: [number, number] = [6.4708721, 3.5800573];

export default function LocationMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView(position, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -30],
    });

    L.marker(position, { icon })
      .addTo(map)
      .bindPopup(
        "📍 9, Redeemed Avenue Street, Off Remlek, Badore, Ajah, Lagos"
      );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
}
