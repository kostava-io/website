"use client";

import { useMemo, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { LiveFeed } from "./components/live-feed";
import data from "./mockdata.json";

export default function Live(): JSX.Element {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const theme = useTheme();
  const [selectedNotification, setSelectedNotification] = useState<
    number | null
  >(null);

  const pins = useMemo(
    () =>
      data.map((item, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={item.longitude}
          latitude={item.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedNotification(index);
          }}
        >
          <div className="vibrate" />
        </Marker>
      )),
    []
  );

  return (
    <div className="flex-1 flex flex-row md:flex-col-reverse overflow-hidden px-4 pt-2 pb-4 gap-2">
      <div className="flex-1">
        <Map
          style={{ width: "100%", height: "100%", borderRadius: "6px" }}
          mapboxAccessToken={mapboxToken}
          mapStyle={
            theme.resolvedTheme === "dark"
              ? "mapbox://styles/mapbox/dark-v11"
              : "mapbox://styles/mapbox/light-v10"
          }
          initialViewState={{
            latitude: 41.69699268371166,
            longitude: 44.79884926662836,
            zoom: 15,
          }}
          maxZoom={20}
          minZoom={1}
          antialias={true}
          terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
        >
          {pins}
          <GeolocateControl position="top-right" />
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <ScaleControl />
        </Map>
      </div>
      <LiveFeed selectedNotification={selectedNotification} />
    </div>
  );
}
