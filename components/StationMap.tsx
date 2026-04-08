"use client";

import { useEffect, useState } from "react";
import { stations, type Station } from "@/lib/stations";

export default function StationMap() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(
    null
  );
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    // Dynamically import Leaflet (SSR-incompatible)
    import("leaflet").then((L) => {
      import("react-leaflet").then(
        ({ MapContainer, TileLayer, Marker, Popup }) => {
          // Fix default marker icon
          delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
            ._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconRetinaUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            shadowUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          });

          const greenIcon = new L.Icon({
            iconUrl:
              "data:image/svg+xml;base64," +
              btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#186E31"/>
                <circle cx="12.5" cy="12.5" r="6" fill="white"/>
              </svg>`),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          });

          function Map() {
            return (
              <MapContainer
                center={[49.78, 18.43]}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stations.map((station) => (
                  <Marker
                    key={station.id}
                    position={[station.lat, station.lng]}
                    icon={greenIcon}
                    eventHandlers={{
                      click: () => setSelectedStation(station),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <p className="font-bold text-sm">{station.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {station.address}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {station.fuels.map((f) => (
                            <span
                              key={f}
                              className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-sm font-bold text-green-700">
                          {station.discount}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            );
          }

          setMapComponent(() => Map);
        }
      );
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => {}
      );
    }
  }, []);

  function getDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  const sortedStations = userLocation
    ? [...stations].sort(
        (a, b) =>
          getDistance(userLocation[0], userLocation[1], a.lat, a.lng) -
          getDistance(userLocation[0], userLocation[1], b.lat, b.lng)
      )
    : stations;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 h-[400px] md:h-[550px]">
        {MapComponent ? (
          <>
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            />
            <MapComponent />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">Načítám mapu...</p>
            </div>
          </div>
        )}
      </div>

      {/* Station list */}
      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
        <p className="text-sm text-gray-400 mb-2">
          {stations.length} partnerských stanic
          {userLocation && " · řazeno dle vzdálenosti"}
        </p>
        {sortedStations.map((station) => (
          <button
            key={station.id}
            type="button"
            onClick={() => setSelectedStation(station)}
            className={`w-full text-left rounded-xl border p-3 transition-all ${
              selectedStation?.id === station.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white hover:border-primary/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-dark">
                  {station.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {station.address}
                  {userLocation && (
                    <span className="ml-1 text-primary">
                      ·{" "}
                      {getDistance(
                        userLocation[0],
                        userLocation[1],
                        station.lat,
                        station.lng
                      ).toFixed(1)}{" "}
                      km
                    </span>
                  )}
                </p>
              </div>
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg shrink-0">
                {station.discount}
              </span>
            </div>
            <div className="flex gap-1.5 mt-2">
              {station.fuels.map((f) => (
                <span
                  key={f}
                  className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
