import React from "react";
import Map from "./components/Map";
import DeviceList from "./components/DeviceList";
import { useDevices } from "./hooks/useDevices";


function App(): React.JSX.Element {
  const { devices, loading, error } = useDevices();

  console.log(devices);
  console.log(loading);
  console.log(error);
  return (
    <div className="w-screen h-screen flex">
      <DeviceList />
      <Map />
    </div>
  );
}

export default App;
