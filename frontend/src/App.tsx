import React, { useState } from "react";
import Map from "./components/Map";
import DeviceList from "./components/DeviceList";
import { useDevices } from "./hooks/useDevices";
import { Device } from "./types/device";

function App(): React.JSX.Element {
  const { devices, loading, error } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(
    undefined
  );
  console.log(selectedDevice);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen h-screen flex border-2 border-gray-200 p-20 gap-4">
      <DeviceList devices={devices} onDeviceSelect={setSelectedDevice} />
      <Map />
    </div>
  );
}

export default App;
