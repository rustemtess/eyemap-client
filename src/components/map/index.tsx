import React, { useRef, useEffect } from "react";
import maplibregl, { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import kzRegions from "./kz.json"; // путь к твоему GeoJSON

interface KazakhstanMapProps {
  regionName: string; // название области из kz.json
}

const KazakhstanRegionMap: React.FC<KazakhstanMapProps> = ({ regionName }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const region = (kzRegions.features as any[]).find(
      f => f.properties.name == regionName
    );
    if (!region) {
      console.warn(`Область "${regionName}" не найдена`);
      return;
    }

    // Создаём карту
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/alidade_satellite.json", // спутник Stadia
      center: [82.6, 49.5],
      zoom: 7,
      minZoom: 0,
      maxZoom: 19
    });

    mapRef.current.on("load", () => {
      const coords = region.geometry.coordinates[0] as [number, number][];

      // Вычисляем bounding box региона
      const bounds = coords.reduce(
        (b: LngLatBounds, c: [number, number]) => b.extend(c),
        new LngLatBounds(coords[0], coords[0])
      );

      // Добавим padding
      const padding = 0.2;
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const paddedBounds = new LngLatBounds(
        [sw.lng - padding, sw.lat - padding],
        [ne.lng + padding, ne.lat + padding]
      );

      mapRef.current!.setMaxBounds(paddedBounds);
      mapRef.current!.fitBounds(paddedBounds, { padding: 20 });

      // Граница области
      mapRef.current!.addSource("region", { type: "geojson", data: region });
      mapRef.current!.addLayer({
        id: "region-line",
        type: "line",
        source: "region",
        paint: { "line-color": "transparent", "line-width": 2 }
      });

      // Маска серым за пределами области
      const outer: [number, number][] = [
        [-180, -90],
        [180, -90],
        [180, 90],
        [-180, 90],
        [-180, -90]
      ];

      const inner = coords.slice().reverse(); // область как hole
      const maskData: GeoJSON.Feature<GeoJSON.Polygon> = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [outer, inner]
        }
      };

      mapRef.current!.addSource("mask", { type: "geojson", data: maskData });
      mapRef.current!.addLayer({
        id: "mask-fill",
        type: "fill",
        source: "mask",
        paint: { "fill-color": "white", "fill-opacity": 1 }
      });
    });

    return () => mapRef.current?.remove();
  }, [regionName]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default KazakhstanRegionMap;
