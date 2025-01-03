import React, { useState, useRef, useEffect } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  RowClassRules,
  RowClickedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Device, DeviceStatus } from "../model/Device";
ModuleRegistry.registerModules([AllCommunityModule]);

interface DeviceListProps {
  devices: Device[]; // Array of devices passed as props
  onDeviceSelect: (device: Device | null) => void; // Callback for selecting a device
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onDeviceSelect }) => {
  const [filterStatus, setFilterStatus] = useState<"all" | DeviceStatus>("all");
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter devices based on the selected status
  const filteredDevices = devices.filter(
    (device) => filterStatus === "all" || device.status === filterStatus
  );

  // Column Definitions: Defines the columns to be displayed.
  const [columns] = useState<ColDef[]>([
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Location (latitude, longitude)",
      flex: 1.5,
      valueGetter: (params) =>
        `${params.data.latitude}, ${params.data.longitude}`,
    },
  ]);

  // Row Class Rules for Conditional Styling
  const rowClassRules: RowClassRules = {
    "bg-gray-200": (params) => params.data.id === selectedDeviceId,
  };

  // Handle Click Outside to Deselect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setSelectedDeviceId(null);
        onDeviceSelect(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onDeviceSelect]);

  // Handle Row Click
  const handleRowClick = (row: RowClickedEvent) => {
    const selectedDevice = row.data as Device;
  
    if (selectedDeviceId !== selectedDevice.id) {
      setSelectedDeviceId(selectedDevice.id);
      onDeviceSelect(selectedDevice); // Only call when the selection changes
    }
  };
  
  return (
    <div className="h-3/4 w-full">
      {/* Filter Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <label className="p-2 bg-green-100 text-teal-700">
          List of {filterStatus} Devices
        </label>
        <div className="flex items-center space-x-2">
          <label className="p-2">Filter by Status:</label>
          <select
            className="p-2 border rounded"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "all" | DeviceStatus)
            }
          >
            <option value="all">All</option>
            <option value={DeviceStatus.Active}>Active</option>
            <option value={DeviceStatus.Inactive}>Inactive</option>
          </select>
        </div>
      </div>
      <div ref={gridRef} className="h-full w-full">
        <AgGridReact
          rowData={filteredDevices}
          columnDefs={columns}
          rowClassRules={rowClassRules} // Apply conditional styling
          onRowClicked={handleRowClick} // Handle row clicks
          domLayout="normal"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 15, 20]}
        />
      </div>
    </div>
  );
};

export default DeviceList;
