import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Device } from "../types/device";

interface Props {
  selectedDevice?: Device;
}

const Map: React.FC<Props> = ({ selectedDevice }) => {

  console.log("Got the device information in Map", selectedDevice);

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return <div className="h-full w-full rounded-lg" id="map-container" ref={mapContainerRef} />;
}

export default Map;