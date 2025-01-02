import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Device } from "../types/device";

interface MapProps {
  devices: Device[]; // Array of all devices
  selectedDevice?: Device; // Currently selected device
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";

  const Map: React.FC<MapProps> = ({ devices, selectedDevice }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

    // Default map view coordinates and zoom level
    const defaultView: { center: [number, number]; zoom: number } = {
      center: [0, 0], // Center of the map (longitude, latitude)
      zoom: 2,
    };
  
    // Initialize the Mapbox map
    useEffect(() => {
      if (mapRef.current || !mapContainerRef.current) return;
  
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: defaultView.center,
        zoom: defaultView.zoom,
      });
  
      // Add all device markers to the map initially
      devices.forEach((device) => {
        new mapboxgl.Marker()
          .setLngLat([device.longitude, device.latitude])
          .addTo(mapRef.current!);
      });
    }, [devices]);

  return (
    <div
      className="h-full w-full rounded-lg"
      id="map-container"
      ref={mapContainerRef}
    />
  );
};

export default Map;
