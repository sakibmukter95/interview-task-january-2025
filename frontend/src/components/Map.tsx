import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Device } from "../model/Device";

interface MapProps {
  devices: Device[]; // Array of all devices
  selectedDevice?: Device; // Currently selected device
}

// The accessToken is a global configuration for the Mapbox library.
mapboxgl.accessToken =
  "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";

const Map: React.FC<MapProps> = ({ devices, selectedDevice }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const selectedMarkerRef = useRef<mapboxgl.Marker | null>(null);

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
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat([device.longitude, device.latitude])
        .addTo(mapRef.current!);
    });
  }, [devices]);

  // Handle updates when a device is selected or deselected
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove the previous selected marker if it exists
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.remove();
    }

    if (selectedDevice) {
      // Fly to the selected device location
      mapRef.current.flyTo({
        center: [selectedDevice.longitude, selectedDevice.latitude],
        zoom: 12,
      });

      // Add a marker for the selected device
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([selectedDevice.longitude, selectedDevice.latitude])
        .addTo(mapRef.current);

      // Track the currently selected marker
      selectedMarkerRef.current = marker;
    } else {
      // Reset to the default map view when no device is selected
      mapRef.current.flyTo({
        center: defaultView.center,
        zoom: defaultView.zoom,
      });
    }
  }, [selectedDevice]);

  return (
    <div
      className="h-4/5 w-full rounded-lg"
      id="map-container"
      ref={mapContainerRef}
    />
  );
};

export default Map;
