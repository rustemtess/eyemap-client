import React, { useRef, useEffect } from "react";
import maplibregl, { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import kzRegions from "./kz.json";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";

interface Application {
  id: number;
  address: string;
  description: string;
  datetime: string;
  verified: string;
  drugType: string;
  coordinates: [number, number];
}

interface IDrug {
  name: string;
  color: string;
}

export const drugTypes: IDrug[] = [
  { name: "Наркозакладчики", color: "#2b7eff" },
  { name: "Наркограффити", color: "#ffba00" },
  { name: "Наркопритон", color: "#fb2b37" }
];

interface KazakhstanMapProps {
  regionName: string;
  applications: Application[];
  initialCoords?: [number, number];
  isAdmin: boolean;
}

const KazakhstanRegionMap: React.FC<KazakhstanMapProps> = ({
  regionName,
  applications,
  initialCoords,
  isAdmin = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const firstLoad = useRef(true);

  // === Создаём карту один раз ===
  useEffect(() => {
    if (!mapContainer.current) return;

    const region = (kzRegions.features as any[]).find(
      (f) => f.properties.name === regionName
    );
    if (!region) return;

    const regionPolygon = polygon(region.geometry.coordinates);

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/alidade_satellite.json",
      center: initialCoords || [83.0, 48.5],
      zoom: initialCoords ? 14 : 5.5,
      minZoom: 4,
      maxZoom: 19
    });

    mapRef.current = map;

    map.on("load", () => {
      const coords = region.geometry.coordinates[0] || region.geometry.coordinates;
      const bounds = coords.reduce(
        (b: LngLatBounds, c: [number, number]) => b.extend(c),
        new LngLatBounds(coords[0], coords[0])
      );

      // Маска за пределами региона
      const outer: [number, number][] = [
        [-180, -90],
        [180, -90],
        [180, 90],
        [-180, 90],
        [-180, -90]
      ];
      const inner = coords.slice().reverse();
      const maskData: GeoJSON.Feature<GeoJSON.Polygon> = {
        type: "Feature",
        properties: {},
        geometry: { type: "Polygon", coordinates: [outer, inner] }
      };
      map.addSource("mask", { type: "geojson", data: maskData });
      map.addLayer({
        id: "mask-fill",
        type: "fill",
        source: "mask",
        paint: { "fill-color": "white", "fill-opacity": 1 }
      });

      // Источник для точек
      const filteredApplications = applications
        .filter((app) => isAdmin || app.verified === "Подтверждено")
        .filter((app) => booleanPointInPolygon(point(app.coordinates), regionPolygon));

      map.addSource("applications", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: filteredApplications.map((app) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: app.coordinates },
            properties: {
              id: app.id,
              address: app.address,
              description: app.description,
              datetime: app.datetime,
              verified: app.verified,
              drugType: app.drugType
            }
          }))
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 40
      });

      // Кластеры
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "applications",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#ffffff",
          "circle-stroke-color": "#333333",
          "circle-stroke-width": 2,
          "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25]
        }
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "applications",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans Bold"],
          "text-size": 12
        },
        paint: { "text-color": "#000" }
      });

      // Одиночные точки
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "applications",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": [
            "match",
            ["get", "drugType"],
            "Наркозакладчики",
            "#2b7eff",
            "Наркограффити",
            "#ffba00",
            "Наркопритон",
            "#fb2b37",
            "#999999"
          ],
          "circle-radius": 6,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#fff"
        }
      });

      // Popup
      map.on("click", "unclustered-point", (e) => {
        const feature = e.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;

        const { drugType, description, datetime, verified, address } = feature.properties as any;

        const coords = feature.geometry.coordinates as [number, number];

        // Для обычных показываем только Подтверждено
        if (!isAdmin && verified !== "Подтверждено") return;

        new maplibregl.Popup({ offset: 10 })
          .setLngLat(coords)
          .setHTML(`
            <div style="font-size:12px; max-width:200px;">
              <b>${drugType}</b><br/>
              ${description}<br/>
              <small>${address}</small><br/>
              ${isAdmin ? `<small>${datetime}</small><br/>` : ''}
              ${isAdmin ? `<span style="color:${
                verified === "Подтверждено"
                  ? "green"
                  : verified === "Отклонено"
                  ? "red"
                  : "orange"
              }">${verified}</span>` : ''}
            </div>
          `)
          .addTo(map);
      });

      // Клик по кластеру
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource("applications") as maplibregl.GeoJSONSource;

        if (!clusterId || !source.getClusterExpansionZoom) return;

        source.getClusterExpansionZoom(clusterId).then((zoom) => {
          map.easeTo({
            center: (features[0].geometry as any).coordinates,
            zoom
          });
        });
      });

      map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
      map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));

      // Центрируем если нет initialCoords
      if (!initialCoords) {
        map.fitBounds(bounds, { padding: 40, maxZoom: 6 });
      }

      firstLoad.current = false;
    });

    return () => map.remove();
  }, []);

  // === Смена региона ===
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const region = (kzRegions.features as any[]).find((f) => f.properties.name === regionName);
    if (!region) return;

    const coords = region.geometry.coordinates[0] || region.geometry.coordinates;
    const bounds = coords.reduce(
      (b: LngLatBounds, c: [number, number]) => b.extend(c),
      new LngLatBounds(coords[0], coords[0])
    );

    // Маска
    const outer: [number, number][] = [
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90]
    ];
    const inner = coords.slice().reverse();
    const maskData: GeoJSON.Feature<GeoJSON.Polygon> = {
      type: "Feature",
      properties: {},
      geometry: { type: "Polygon", coordinates: [outer, inner] }
    };

    const maskSource = map.getSource("mask") as maplibregl.GeoJSONSource;
    maskSource?.setData(maskData);

    map.fitBounds(bounds, { padding: 40, maxZoom: 6, animate: false });
    map.setMaxBounds(bounds);
  }, [regionName]);

  // === Обновление точек ===
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const source = map.getSource("applications") as maplibregl.GeoJSONSource;
    const region = (kzRegions.features as any[]).find((f) => f.properties.name === regionName);
    if (!region || !source) return;

    const regionPolygon = polygon(region.geometry.coordinates);

    const filteredApplications = applications
      .filter((app) => isAdmin || app.verified === "Подтверждено")
      .filter((app) => booleanPointInPolygon(point(app.coordinates), regionPolygon));

    source.setData({
      type: "FeatureCollection",
      features: filteredApplications.map((app) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: app.coordinates },
        properties: {
          id: app.id,
          address: app.address,
          description: app.description,
          datetime: app.datetime,
          verified: app.verified,
          drugType: app.drugType
        }
      }))
    });
  }, [applications, regionName, isAdmin]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default KazakhstanRegionMap;
