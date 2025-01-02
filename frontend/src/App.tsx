import React, { useState } from "react";
import Map from "./components/Map";
import DeviceList from "./components/DeviceList";
import { useDevices } from "./hooks/useDevices";
import { Device } from "./types/device";

function App(): React.JSX.Element {
  // Fetch devices from the backend using a custom hook
  const { devices, loading, error } = useDevices();

  // Track the currently selected device for passing to the Map component
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(
    undefined
  );

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen h-screen flex p-20 gap-4">
      <DeviceList devices={devices} onDeviceSelect={setSelectedDevice} />
      <Map devices={devices} selectedDevice={selectedDevice} />
    </div>
  );
}

export default App;
